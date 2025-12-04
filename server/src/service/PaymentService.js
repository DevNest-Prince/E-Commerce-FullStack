import PaymentOrder from "../models/PaymentOrder.js";
import razorpay from "../config/razorpayClient.js";
import Order from "../models/Order.js";
import PaymentStatus from "../domain/PaymentStatus.js";


class PaymentService  {

    async createOrder(user, orders) {
        const amount = orders.reduce((sum, order) => sum + order.totalSellingPrice, 0);

        const paymentOrder = new PaymentOrder({
            amount,
            user: user._id,
            order: orders.map(order => order._id)
        })

        return await paymentOrder.save();
    }

    async getPaymentOrderById(orderId) {
        const paymentOrder = await PaymentOrder.findOne(orderId)

        if(!paymentOrder) {
            throw new Error("Payment Order not found");
        }

        return paymentOrder;
    }

    async getPaymentOrdersByPaymentLinkId(paymentLinkId) {
        const paymentOrders = await PaymentOrder.findOne({ paymentLinkId });

        if(!paymentOrders) {
            throw new Error("Payment Orders not found for the given Payment Link ID");
        }

        return paymentOrders;
    }

    async proceedPayment(paymentOrder, paymentId, paymentLinkId) {
        if(paymentOrder.status === PaymentStatus.PENDING) {
            const payment = await razorpay.payments.fetch(paymentId)

            if(payment.status === 'captured') {
                await Promise.all(paymentOrder.orders.map(async (orderId) => {
                    const order = await Order.findById(orderId);
                    order.paymentStatus = PaymentStatus.COMPLETED;
                    order.orderStatus = OrderStatus.PLACED;
                    await order.save();
                }))

                paymentOrder.status = PaymentStatus.SUCCESS;

                await paymentOrder.save();

                return true;

            } else {
                paymentOrder.status = PaymentStatus.FAILED;
                await paymentOrder.save();
                return false;
            }
        }

        return false;
    }

    async createRazorPayPaymentLink(user, amount, orderId) {
        try {
            const paymentLinkRequest = {
                amount: amount * 100, // Amount in paise
                currency: "INR",
                customers: {
                    name: user.fullName,
                    email: user.email,
                },
                notify:{
                    email: true
                },
                callback_url:`http://localhost:5000/payment-success/${orderId}`,
                callback_method: "get"
            }

            const paymentLink = await razorpay.paymentLink.create(paymentLinkRequest)

            return paymentLink;

        } catch (error) {
            throw new Error(`Failed to create Razorpay payment link: ${error.message}`);
        }
    }

}

export default new PaymentService();