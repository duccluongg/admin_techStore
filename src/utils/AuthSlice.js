import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import adminApi from '../api/adminApi';
import storageUser from '../constants/storageUser';

export const adminLogin = createAsyncThunk(
  'adminLogin',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await adminApi.adminLogin(payload);
      if (payload.remember)
        localStorage.setItem(storageUser.TOKEN, response.data.access_token);
      else
        sessionStorage.setItem(storageUser.TOKEN, response.data.access_token);
      return response.access_token;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const adminInfor = createAsyncThunk(
  'adminInfor',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await adminApi.adminInfor();
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isRequesting: false,
    isSuccess: false,
    isError: false,
    errorMessage: '',
    info: {},
  },
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isRequesting = false;
      state.isSuccess = false;
      return state;
    },
  },
  extraReducers: {
    [adminLogin.pending]: (state) => {
      state.isRequesting = true;
      state.isSuccess = false;
      state.isError = false;
    },
    [adminLogin.fulfilled]: (state) => {
      state.isRequesting = false;
      state.isSuccess = true;
    },
    [adminLogin.rejected]: (state, { payload }) => {
      state.isRequesting = false;
      state.isError = true;
      state.errorMessage = 'Sai tên đăng nhập hoặc mật khẩu';
    },
    [adminInfor.pending]: (state) => {
      state.status = 'adminInfor.pending';
    },
    [adminInfor.fulfilled]: (state, { payload }) => {
      state.info = payload;
      state.status = 'adminInfor.fullfilled';
    },
    [adminInfor.rejected]: (state, { payload }) => {
      state.errorMessage = 'bị lỗi';
      state.status = 'adminInfor.rejected';
    },
  },
});

const { actions, reducer } = authSlice;
export const authSelector = (state) => state.auth;
export default reducer;
export const { clearState } = actions;
