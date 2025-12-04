// src/redux/slices/sellerOrderSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../Config/Api';

// Initial State
const initialState = {
  orders: [],
  loading: false,
  error: null,
};

// ===============================
// Fetch Seller Orders
// ===============================
export const fetchSellerOrders = createAsyncThunk(
  'sellerOrders/fetchSellerOrders',
  async (jwt, { rejectWithValue }) => {
    try {
      const response = await api.get('/api/seller/orders', {
        headers: { Authorization: `Bearer ${jwt}` },
      });

      console.log("fetch seller orders", response.data);
      return response.data;
    } catch (error) {
      console.log("error", error.response);
      return rejectWithValue(error.response?.data || "Failed to fetch orders");
    }
  }
);

// ===============================
// Update Order Status
// ===============================
export const updateOrderStatus = createAsyncThunk(
  'sellerOrders/updateOrderStatus',
  async ({ jwt, orderId, orderStatus }, { rejectWithValue }) => {
    try {
      const response = await api.patch(
        `/api/seller/orders/${orderId}/status/${orderStatus}`,
        {},
        { headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` } }
      );

      console.log("order status updated", response.data);
      return response.data;
    } catch (error) {
      console.log("error updating order status ---- ", error);
      return rejectWithValue(error.response?.data || "Failed to update order");
    }
  }
);

// ===============================
// Delete Order
// ===============================
export const deleteOrder = createAsyncThunk(
  'sellerOrders/deleteOrder',
  async ({ jwt, orderId }, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/api/seller/orders/${orderId}/delete`, {
        headers: { Authorization: `Bearer ${jwt}` },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to delete order");
    }
  }
);

// ===============================
// Slice
// ===============================
const sellerOrderSlice = createSlice({
  name: 'sellerOrders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Orders
      .addCase(fetchSellerOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSellerOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchSellerOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Order Status
      .addCase(updateOrderStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.orders.findIndex(
          (order) => order._id === action.payload._id
        );
        if (index !== -1) {
          state.orders[index] = action.payload;
        }
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete Order
      .addCase(deleteOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = state.orders.filter(
          (order) => order._id !== action.meta.arg.orderId
        );
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default sellerOrderSlice.reducer;
