import { useMakePaymentMutation, useVerifyPaymentMutation } from "@/features/api/authApi";
import { useNavigate, useParams } from "react-router-dom";

const BuyCourse = () => {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const [makePayment, { isLoading }] = useMakePaymentMutation();
    const [verifyPayment] = useVerifyPaymentMutation();

    const handlePayment = async () => {
        try {
            // ✅ step 1 - create razorpay order
            const orderData = await makePayment(courseId).unwrap();

            // ✅ step 2 - open razorpay payment window
            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID, // ✅ from .env
                amount: orderData.amount,
                currency: orderData.currency,
                order_id: orderData.order_id,
                name: "E-Learning",
                description: "Course Purchase",
                handler: async (response) => {
                    try {
                        const verifyData = await verifyPayment({
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                            courseId 
                        }).unwrap();

                        if (verifyData.success) {
                            toast.success("Payment successful!");
                            navigate('/my-courses'); 
                        }
                    } catch (error) {
                        toast.error("Payment verification failed");
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

            const razor = new window.Razorpay(options);
            razor.open();

        } catch (error) {
            toast.error("Payment failed");
            console.log(error);
        }
    }

    return (
        <Button
            onClick={handlePayment}
            disabled={isLoading}
            className="w-full">
            {isLoading ? "Processing..." : "Buy Now"}
        </Button>
    )
}

export default BuyCourse;
