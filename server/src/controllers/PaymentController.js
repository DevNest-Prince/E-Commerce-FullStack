import OrderService from "../service/OrderService.js";
import PaymentService from "../service/PaymentService.js";
import SellerReportService from "../service/SellerReportService.js";
import SellerService from "../service/SellerService.js";
import TransactionService from "../service/TransactionService.js";


const paymentHandler = async (req, res) => {
    const {paymentId} = req.params;
    const {paymentLinkId} = req.query;

    try {
        // get user from jwt token
        const user = await req.user;

        const paymentOrder = await PaymentService.getPaymentOrdersByPaymentLinkId(paymentLinkId);

        const paymentSuccess = await PaymentService.proceedPayment(
            paymentOrder,
            paymentId,
            paymentLinkId
        )

        if(paymentSuccess) {
            for (let orderId of paymentOrder.orders) {
                const order = await OrderService.findOrderById(orderId);

                // create transaction for the order
                await TransactionService.createTransaction(order);

                // get seller details
                const seller = await SellerService.getSellerById(order.seller)
                const sellerReport = await SellerReportService.getSellerReport(seller);

                // update the seller report
                sellerReport.totalOrders += 1;
                sellerReport.totalEarnings += order.totalSellingPrice;
                sellerReport.totalSales += order.orderItems.length;

                const updatedReport = await SellerReportService.updateSellerReport(sellerReport);

            }

            // clear user's cart after successful payment
            // await Cart.findOneAndUpdate(
            //     {user: user._id},
            //     {cartItems: [] },
            //     { new: true }
            // );

            return res.status(201).json({
                message: "Payment successful"
            })

        } else {
            return res.status(400).json({
                message: "Payment failed"
            })
        }

    } catch (error) {
        return res.status(500).json({
            message: "An error occurred during payment processing",
            error: error.message
        });
    }
}

export default { paymentHandler };