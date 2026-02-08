import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sales: [],
  isLoading: false,
  isError: false,
  message: ''
};

const saleSlice = createSlice({
  name: 'sales',
  initialState,
  reducers: {
    reset: (state) => initialState
  }
});

export const { reset } = saleSlice.actions;
export default saleSlice.reducer;
