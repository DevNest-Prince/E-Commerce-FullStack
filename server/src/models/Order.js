import mongoose from 'mongoose';
import OrderStatus from '../domain/OrderStatus.js';
import PaymentStatus from '../domain/PaymentStatus.js';

const orderSchema = new mongoose.Schema({
    
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true,
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Seller', // Reference to the Seller model
        required: true,
    },
    orderItems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'OrderItem', 
    }],
    shippingAddress: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address', 
        required: true,
    },
    
    totalMrpPrice: {
        type: Number,
        required: true,
    },
    totalSellingPrice: {
        type: Number,
        required: true,
    },
    discount: {
        type: Number,
        default: 0,
    },
    orderStatus: {
        type: String,
        enum: Object.values(OrderStatus), 
        default: OrderStatus.PENDING,
    },
    totalItem: {
        type: Number,
        required: true,
    },
    paymentStatus: {
        type: String,
        enum: Object.values(PaymentStatus),
        default: PaymentStatus.PENDING,
    },
    orderDate: {
        type: Date,
        default: Date.now,
    },
    deliverDate: {
        type: Date,
        default: function() {
            return Date.now() + 7 * 24 * 60 * 60 * 1000; 
        },
    },
}, {
    timestamps: true, 
});

const Order = mongoose.model('Order', orderSchema);

export default Order;