import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../Config/Api";

// API base URL
const API_BASE_URL = "/api/sellers/revenue/chart";

// Initial State
const initialState = {
  chart: [],
  loading: false,
  error: null,
};

// =========================
// Thunk: Fetch Revenue Chart
// =========================
export const fetchRevenueChart = createAsyncThunk(
  "revenue/fetchRevenueChart",
  async ({ type }, { rejectWithValue }) => {
    console.log("type ---- ", type);

    try {
      const token = localStorage.getItem("jwt");

      const response = await api.get(API_BASE_URL, {
        params: { type },
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("revenue chart #####", response.data);

      return response.data;
    } catch (error) {
      console.log("error ", error.response);
      return rejectWithValue(
        error.response?.data || "Failed to fetch revenue chart"
      );
    }
  }
);

// =========================
// Slice
// =========================
const revenueSlice = createSlice({
  name: "revenue",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRevenueChart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchRevenueChart.fulfilled, (state, action) => {
        state.loading = false;
        state.chart = action.payload;
      })

      .addCase(fetchRevenueChart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default revenueSlice.reducer;
