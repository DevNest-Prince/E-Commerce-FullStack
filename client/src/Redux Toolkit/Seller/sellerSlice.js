import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { api } from "../../Config/Api";

const API_URL = "/sellers";

// =========================================
// Initial State
// =========================================
const initialState = {
  sellers: [],
  selectedSeller: null,
  profile: null,
  loading: false,
  error: null,
  report: null,
  profileUpdated: false,
};

// =========================================
// Thunks
// =========================================

// Fetch Seller Profile
export const fetchSellerProfile = createAsyncThunk(
  "sellers/fetchSellerProfile",
  async (jwt, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_URL}/profile`, {
        headers: { Authorization: `Bearer ${jwt}` },
      });

      console.log("fetch seller profile", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch seller profile");
    }
  }
);

// Fetch All Sellers
export const fetchSellers = createAsyncThunk(
  "sellers/fetchSellers",
  async (status, { rejectWithValue }) => {
    try {
      const response = await api.get(API_URL, { params: { status } });
      console.log("fetch sellers", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch sellers");
    }
  }
);

// Fetch Seller Report
export const fetchSellerReport = createAsyncThunk(
  "sellers/fetchSellerReport",
  async (jwt, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api${API_URL}/report`, {
        headers: { Authorization: `Bearer ${jwt}` },
      });

      console.log("Fetch seller report", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch seller report");
    }
  }
);

// Fetch Seller By ID
export const fetchSellerById = createAsyncThunk(
  "sellers/fetchSellerById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch seller");
    }
  }
);

// Update Seller
export const updateSeller = createAsyncThunk(
  "sellers/updateSeller",
  async (seller, { rejectWithValue }) => {
    try {
      const response = await api.patch(`${API_URL}`, seller, {
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
      });

      console.log("seller updated successfully", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to update seller");
    }
  }
);

// Update Seller Account Status
export const updateSellerAccountStatus = createAsyncThunk(
  "sellers/updateSellerAccountStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/admin/seller/${id}/status/${status}`);
      console.log("update seller status: ", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to update seller status");
    }
  }
);

// Verify Seller Email
export const verifySellerEmail = createAsyncThunk(
  "sellers/verifySellerEmail",
  async ({ otp, navigate }, { rejectWithValue }) => {
    try {
      const response = await api.patch(`${API_URL}/verify/${otp}`);
      navigate("/seller-account-verified");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to verify email");
    }
  }
);

// Delete Seller
export const deleteSeller = createAsyncThunk(
  "sellers/deleteSeller",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`${API_URL}/${id}`);
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to delete seller");
    }
  }
);

// =========================================
// Slice
// =========================================

const sellerSlice = createSlice({
  name: "sellers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // Fetch Seller Profile
      .addCase(fetchSellerProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.profileUpdated = false;
      })
      .addCase(fetchSellerProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.loading = false;
      })
      .addCase(fetchSellerProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch seller profile";
      })

      // Fetch Sellers
      .addCase(fetchSellers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSellers.fulfilled, (state, action) => {
        state.sellers = action.payload;
        state.loading = false;
      })
      .addCase(fetchSellers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch sellers";
      })

      // Fetch Seller By ID
      .addCase(fetchSellerById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSellerById.fulfilled, (state, action) => {
        state.selectedSeller = action.payload;
        state.loading = false;
      })
      .addCase(fetchSellerById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch seller";
      })

      // Update Seller
      .addCase(updateSeller.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.profileUpdated = false;
      })
      .addCase(updateSeller.fulfilled, (state, action) => {
        const index = state.sellers.findIndex(
          (seller) => seller._id === action.payload._id
        );
        if (index !== -1) {
          state.sellers[index] = action.payload;
        }

        state.profile = action.payload;
        state.profileUpdated = true;
        state.loading = false;
      })
      .addCase(updateSeller.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update seller";
      })

      // Update Seller Status
      .addCase(updateSellerAccountStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSellerAccountStatus.fulfilled, (state, action) => {
        const index = state.sellers.findIndex(
          (seller) => seller._id === action.payload._id
        );
        if (index !== -1) {
          state.sellers[index] = action.payload;
        }
        state.loading = false;
      })
      .addCase(updateSellerAccountStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update seller";
      })

      // Delete Seller
      .addCase(deleteSeller.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSeller.fulfilled, (state, action) => {
        state.sellers = state.sellers.filter(
          (seller) => seller._id !== action.meta.arg
        );
        state.loading = false;
      })
      .addCase(deleteSeller.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to delete seller";
      })

      // Seller Report
      .addCase(fetchSellerReport.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSellerReport.fulfilled, (state, action) => {
        state.report = action.payload;
        state.loading = false;
      })
      .addCase(fetchSellerReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default sellerSlice.reducer;

// =========================================
// Selectors (JS Version)
// =========================================

export const selectSellers = (state) => state.sellers.sellers;
export const selectSelectedSeller = (state) => state.sellers.selectedSeller;
export const selectSellerLoading = (state) => state.sellers.loading;
export const selectSellerError = (state) => state.sellers.error;
