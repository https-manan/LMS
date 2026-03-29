import { Button } from '@/components/ui/button';
import { useMakePaymentMutation, useVerifyPaymentMutation } from '@/features/api/authApi';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';

const BuyCourse = () => {

    const { courseId } = useParams(); // ✅ get courseId from URL
    const navigate = useNavigate();

    const [makePayment, { isLoading }] = useMakePaymentMutation();
    const [verifyPayment] = useVerifyPaymentMutation();


    const handlePayment = async () => {
        try {
            // ✅ step 1 - call our backend to create razorpay order
            const orderData = await makePayment(courseId).unwrap();

            // ✅ step 2 - configure razorpay popup options
            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID, // from .env
                amount: orderData.amount,
                currency: orderData.currency,
                order_id: orderData.order_id,
                name: "E-Learning",
                description: "Course Purchase",

                // ✅ step 3 - this function runs AUTOMATICALLY after user pays
                // razorpay calls this with payment proof
                handler: async (response) => {
                    try {
                        // ✅ step 4 - send proof to our backend to verify
                        const verifyData = await verifyPayment({
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                            courseId // ✅ needed so backend knows which course to unlock
                        }).unwrap();

                        if (verifyData.success) {
                            toast.success("Payment successful! Enjoy your course 🎉");
                            navigate('/my-courses'); // ✅ go to my courses after payment
                        }
                    } catch (error) {
                        toast.error("Payment verification failed");
                        console.log(error);
                    }
                },
                prefill: {
                    name: "",
                    email: "",
                },
                theme: {
                    color: "#000000"
                }
            };

            // ✅ step 5 - open razorpay popup
            // window.Razorpay comes from the script tag in index.html
            const razor = new window.Razorpay(options);
            razor.open();

        } catch (error) {
            toast.error("Something went wrong");
            console.log(error);
        }
    }

    return (
        <Button
            onClick={handlePayment}
            disabled={isLoading}
            className="w-full cursor-pointer">
            {isLoading ? "Processing..." : "Buy Now"}
        </Button>
    )
}

export default BuyCourse;