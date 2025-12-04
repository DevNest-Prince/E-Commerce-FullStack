import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../../Config/Api';

// Fetch home page data
export const fetchHomePageData = createAsyncThunk(
  'home/fetchHomePageData',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/home-page');
      console.log("home page ", response.data);
      return response.data;
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        error.message ||
        'Failed to fetch home page data';

      console.log("error ", errorMessage, error);
      return rejectWithValue(errorMessage);
    }
  }
);

// Create home categories
export const createHomeCategories = createAsyncThunk(
  'home/createHomeCategories',
  async (homeCategories, { rejectWithValue }) => {
    try {
      const response = await api.post('/home/categories', homeCategories);
      console.log("home categories ", response.data);
      return response.data;
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        error.message ||
        'Failed to create home categories';

      console.log("error ", errorMessage, error);
      return rejectWithValue(errorMessage);
    }
  }
);
