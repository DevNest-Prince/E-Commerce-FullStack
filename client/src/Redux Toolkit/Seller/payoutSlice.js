import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../Config/Api";

// Initial State
const initialState = {
  payouts: [],
  payout: null,
  loading: false,
  error: null,
};

// =========================
// Thunks
// =========================

// Fetch all payouts for seller
export const fetchPayoutsBySeller = createAsyncThunk(
  "payouts/fetchPayoutsBySeller",
  async (jwt, { rejectWithValue }) => {
    try {
      const response = await api.get("/api/payouts/seller", {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      console.log("Payouts ", response.data);
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue("Failed to fetch payouts");
    }
  }
);

// Fetch payout by ID
export const fetchPayoutById = createAsyncThunk(
  "payouts/fetchPayoutById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/payouts/${id}`);
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue("Failed to fetch payout");
    }
  }
);

// Update payout status
export const updatePayoutStatus = createAsyncThunk(
  "payouts/updatePayoutStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/api/payouts/${id}/status`, null, {
        params: { status },
      });

      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue("Failed to update payout status");
    }
  }
);

// =========================
// Slice
// =========================

const payoutsSlice = createSlice({
  name: "payouts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // Fetch payouts
      .addCase(fetchPayoutsBySeller.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPayoutsBySeller.fulfilled, (state, action) => {
        state.loading = false;
        state.payouts = action.payload;
      })
      .addCase(fetchPayoutsBySeller.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch single payout
      .addCase(fetchPayoutById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPayoutById.fulfilled, (state, action) => {
        state.loading = false;
        state.payout = action.payload;
      })
      .addCase(fetchPayoutById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update payout status
      .addCase(updatePayoutStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePayoutStatus.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.payouts.findIndex(
          (p) => p._id === action.payload._id
        );

        if (index !== -1) {
          state.payouts[index] = action.payload;
        }
      })
      .addCase(updatePayoutStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default payoutsSlice.reducer;
