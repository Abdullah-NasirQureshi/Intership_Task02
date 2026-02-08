import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  isLoading: false,
  isError: false,
  message: ''
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    reset: (state) => initialState
  }
});

export const { reset } = productSlice.actions;
export default productSlice.reducer;
