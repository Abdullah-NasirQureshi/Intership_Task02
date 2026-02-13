import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/sales';

// Create new sale
export const createSale = createAsyncThunk(
  'sales/create',
  async (saleData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post(API_URL, saleData, config);
      return response.data.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get user sales
export const getSales = createAsyncThunk(
  'sales/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(API_URL, config);
      return response.data.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const initialState = {
  sales: [],
  isError: false,
  isSuccess: false,
  isCreateSuccess: false,
  isLoading: false,
  message: '',
};

export const saleSlice = createSlice({
  name: 'sales',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isCreateSuccess = false;
      state.isError = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createSale.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createSale.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isCreateSuccess = true;
        state.sales.push(action.payload);
      })
      .addCase(createSale.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getSales.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSales.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.sales = action.payload;
      })
      .addCase(getSales.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = saleSlice.actions;
export default saleSlice.reducer;
