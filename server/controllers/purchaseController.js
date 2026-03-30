import { Course } from '../models/courseModel.js';
import { Purchase } from '../models/purchaseCourseModel.js';
import { User } from '../models/usermodel.js';
import crypto from 'crypto';
import { instance } from '../utils/Razorpay.js';

export const makePayment = async (req, res) => {
    try {
        const { courseId } = req.params;
        const userId = req.id;

        // ✅ added await - was missing before so course was always a Promise not actual data
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({
                msg: "No course found"
            })
        }

        const options = {
            amount: course.coursePrice * 100, // ✅ removed hardcoded 900, using actual price
            currency: "INR",
            receipt: `receipt_${Date.now()}`,
        };

        const order = await instance.orders.create(options);

        return res.json({
            success: true,
            order_id: order.id,
            amount: order.amount,
            currency: order.currency,
            courseId,
            userId
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "Error in payment endpoint"
        })
    }
}

export const verifyPayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, courseId } = req.body; // ✅ courseId from body not params
        const userId = req.id;

        const body = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(body)
            .digest("hex");

        if (expectedSignature === razorpay_signature) {
            const course = await Course.findById(courseId);

            // ✅ save purchase record
            await Purchase.create({
                courseId,
                userId,
                paymentId: razorpay_payment_id,
                amount: course.coursePrice,
                status: "success"
            });

            // ✅ add course to user's enrolledCourses
            await User.findByIdAndUpdate(userId, {
                $addToSet: { enrolledCourses: courseId }
            });

            // ✅ add user to course's enrolledStudents
            await Course.findByIdAndUpdate(courseId, {
                $addToSet: { enrolledStudents: userId }
            });

            return res.json({
                success: true,
                message: "Payment verified",
            });
        } else {
            // ✅ save failed purchase record
            await Purchase.create({
                courseId,
                userId,
                paymentId: razorpay_payment_id,
                amount: 0,
                status: "failed"
            });

            return res.status(400).json({
                success: false,
                message: "Invalid signature",
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "Error in verify payment endpoint"
        })
    }
}