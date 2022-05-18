import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import adminApi from '../api/adminApi';

export const getListUser = createAsyncThunk(
  'getListUser',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await adminApi.getListUser();
      return response.data.results;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getListOrder = createAsyncThunk(
  'getListOrder',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await adminApi.getListOrder();
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getListProduct = createAsyncThunk(
  'getListProduct',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await adminApi.getListProduct(payload);
      return response.data.results;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getListCategory = createAsyncThunk(
  'getListCategory',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await adminApi.getListCategory();
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);
export const getListBrand = createAsyncThunk(
  'getListBrand',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await adminApi.getListBrand();
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getProductDetail = createAsyncThunk(
  'getProductDetail',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await adminApi.getProductDetail(payload);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const addNewProduct = createAsyncThunk(
  'addNewProduct',
  async (payload, { rejectWithValue, dispatch }) => {
    try {
      const response = await adminApi.addNewProduct(payload);
      dispatch(getListProduct());
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);
export const delProduct = createAsyncThunk(
  'delProduct',
  async (payload, { rejectWithValue, dispatch }) => {
    try {
      const response = await adminApi.delProduct(payload);
      dispatch(getListProduct());
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const delUser = createAsyncThunk(
  'delUser',
  async (payload, { rejectWithValue, dispatch }) => {
    try {
      const response = await adminApi.delUser(payload);
      dispatch(getListUser());
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateProduct = createAsyncThunk(
  'delProduct',
  async ({ values, id }, { rejectWithValue, dispatch }) => {
    try {
      console.log(values, id);
      const response = await adminApi.updateProduct(values, id);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

const adminSlice = createSlice({
  name: 'auth',
  initialState: {
    listUser: [],
    listOrder: [],
    listProduct: [],
    listCategory: [],
    listBrand: [],
    newProduct: {},
    productDetail: {},
  },
  reducers: {
    clearState: (state) => {
      return state;
    },
  },
  extraReducers: {
    [getListUser.pending]: (state) => {
      state.status = 'adminInfor.pending';
    },
    [getListUser.fulfilled]: (state, { payload }) => {
      state.listUser = payload;
      state.status = 'adminInfor.fullfilled';
    },
    [getListUser.rejected]: (state, { payload }) => {
      state.errorMessage = 'bị lỗi';
      state.status = 'adminInfor.rejected';
    },
    [getListOrder.pending]: (state) => {
      state.status = 'getListOrder.pending';
    },
    [getListOrder.fulfilled]: (state, { payload }) => {
      state.listOrder = payload;
      state.status = 'getListOrder.fullfilled';
    },
    [getListOrder.rejected]: (state, { payload }) => {
      state.errorMessage = 'bị lỗi';
      state.status = 'getListOrder.rejected';
    },
    [getListProduct.pending]: (state) => {
      state.status = 'getListProduct.pending';
    },
    [getListProduct.fulfilled]: (state, { payload }) => {
      state.listProduct = payload;
      state.status = 'getListProduct.fullfilled';
    },
    [getListProduct.rejected]: (state, { payload }) => {
      state.errorMessage = 'bị lỗi';
      state.status = 'getListProduct.rejected';
    },
    [getListCategory.pending]: (state) => {
      state.status = 'getListCategory.pending';
    },
    [getListCategory.fulfilled]: (state, { payload }) => {
      state.listCategory = payload;
      state.status = 'getListCategory.fullfilled';
    },
    [getListCategory.rejected]: (state, { payload }) => {
      state.errorMessage = 'bị lỗi';
      state.status = 'getListCategory.rejected';
    },
    [getListBrand.pending]: (state) => {
      state.status = 'getListBrand.pending';
    },
    [getListBrand.fulfilled]: (state, { payload }) => {
      state.listBrand = payload;
      state.status = 'getListBrand.fullfilled';
    },
    [getListBrand.rejected]: (state, { payload }) => {
      state.errorMessage = 'bị lỗi';
      state.status = 'getListBrand.rejected';
    },
    [getProductDetail.pending]: (state) => {
      state.status = 'getProductDetail.pending';
    },
    [getProductDetail.fulfilled]: (state, { payload }) => {
      state.productDetail = payload;
      state.status = 'getProductDetail.fullfilled';
    },
    [getProductDetail.rejected]: (state, { payload }) => {
      state.errorMessage = 'bị lỗi';
      state.status = 'getProductDetail.rejected';
    },
    [addNewProduct.pending]: (state) => {
      state.status = 'addNewProduct.pending';
    },
    [addNewProduct.fulfilled]: (state, { payload }) => {
      state.newProduct = payload;
      state.status = 'addNewProduct.fullfilled';
    },
    [addNewProduct.rejected]: (state, { payload }) => {
      state.errorMessage = 'bị lỗi';
      state.status = 'addNewProduct.rejected';
    },
  },
});

const { actions, reducer } = adminSlice;
export default reducer;
export const { clearState } = actions;
