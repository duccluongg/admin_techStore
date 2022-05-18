import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../utils/AuthSlice';
import adminReducer from '../utils/AdminSlice';
const rootReducer = {
  auth: authReducer,
  admin: adminReducer,
};

const store = configureStore({
  reducer: rootReducer,
});
export default store;
