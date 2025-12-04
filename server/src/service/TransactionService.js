import Order from "../models/Order.js";
import Seller from "../models/Seller.js";
import Transaction from "../models/Transaction.js";


class TransactionService {
    async createTransaction(orderId) {
        // find the order by orderId
        const order = await Order.findById(orderId).populate('seller');
        if(!order) {
            throw new Error("Order not found for creating transaction");
        }

        // find the seller by order.seller
        const seller = await Seller.findById(order.seller._id)
        if(!seller) {
            throw new Error("Seller not found for creating transaction");
        }

        // create a new transaction
        const transaction = new Transaction({
            seller: seller._id,
            customer: order.user,
            order: order._id,
        })

        return await transaction.save();

    }

    // get transactions by seller id
    async getTransactionsBySellerId(sellerId) {
        return await Transaction.find({ seller: sellerId }).populate('order');
    }

    // get all transactions
    async getAllTransactions() {
        return await Transaction.find().populate('seller order customer');
    }
}

export default new TransactionService();