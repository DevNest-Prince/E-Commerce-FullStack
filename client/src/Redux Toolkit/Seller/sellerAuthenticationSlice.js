import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../Config/Api';
import axios from 'axios';
import { sendLoginSignupOtp } from '../Customer/AuthSlice';

// Initial State
const initialState = {
    otpSent: false,
    error: null,
    loading: false,
    jwt: null,
    sellerCreated: ""
};

const API_URL = '/sellers';

// Send login OTP
export const sendLoginOtp = createAsyncThunk(
    'otp/sendLoginOtp',
    async (email, { rejectWithValue }) => {
        try {
            const { data } = await api.post('/sellers/sent/login-top', { email });
            console.log("otp sent - ", email, data);
            return { email };
        } catch (error) {
            console.log("error", error);
            return rejectWithValue(error.response?.data?.message || 'Failed to send OTP');
        }
    }
);

// Verify OTP
export const verifyLoginOtp = createAsyncThunk(
    'otp/verifyLoginOtp',
    async (data, { rejectWithValue }) => {
        try {
            const response = await api.post('/sellers/verify/login-otp', data);
            console.log("login seller success - ", response.data);

            localStorage.setItem("jwt", response.data.jwt);
            data.navigate("/seller");

            return response.data;
        } catch (error) {
            console.log("error", error.response?.data);
            return rejectWithValue(error.response?.data?.message || 'Failed to verify OTP');
        }
    }
);

// Create seller
export const createSeller = createAsyncThunk(
    'sellers/createSeller',
    async (seller, { rejectWithValue }) => {
        try {
            const response = await api.post(API_URL, seller);
            console.log('create seller', response.data);
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                console.error('Create seller error:', error.response.data);
                return rejectWithValue(error.message);
            } else {
                console.error('Create seller error message:', error.message);
                return rejectWithValue('Failed to create seller');
            }
        }
    }
);

// Slice
const sellerAuthSlice = createSlice({
    name: 'sellerAuth',
    initialState,
    reducers: {
        resetSellerAuthState: (state) => {
            state.otpSent = false;
            state.error = null;
            state.loading = false;
            state.jwt = null;
        },
    },
    extraReducers: (builder) => {
        // send OTP
        builder
            .addCase(sendLoginSignupOtp.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(sendLoginSignupOtp.fulfilled, (state) => {
                state.loading = false;
                state.otpSent = true;
                state.error = null;
            })
            .addCase(sendLoginSignupOtp.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // verify OTP
        builder
            .addCase(verifyLoginOtp.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(verifyLoginOtp.fulfilled, (state, action) => {
                state.loading = false;
                state.jwt = action.payload.jwt;
                state.error = null;
            })
            .addCase(verifyLoginOtp.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // create seller
        builder
            .addCase(createSeller.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createSeller.fulfilled, (state) => {
                state.sellerCreated = "verification email sent to you";
                state.loading = false;
            })
            .addCase(createSeller.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to create seller';
            });
    },
});

export const { resetSellerAuthState } = sellerAuthSlice.actions;
export default sellerAuthSlice.reducer;
