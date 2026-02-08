import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import productReducer from './slices/productSlice';
import customerReducer from './slices/customerSlice';
import saleReducer from './slices/saleSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    customers: customerReducer,
    sales: saleReducer
  }
});
