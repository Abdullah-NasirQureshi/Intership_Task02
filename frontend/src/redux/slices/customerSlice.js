import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  customers: [],
  isLoading: false,
  isError: false,
  message: ''
};

const customerSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {
    reset: (state) => initialState
  }
});

export const { reset } = customerSlice.actions;
export default customerSlice.reducer;
