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
  async ({ categoryId, brandId }, { rejectWithValue }) => {
    try {
      const response = await adminApi.getListProduct({ categoryId, brandId });
      return response.data.results;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getTotalProduct = createAsyncThunk(
  'getTotalProduct',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await adminApi.getTotalProduct();
      return response.data.total;
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
    const categoryId = payload.category_id;
    const brandId = payload.brand_id;
    console.log(categoryId, brandId);
    try {
      const response = await adminApi.addNewProduct(payload);
      dispatch(getListProduct({ categoryId, brandId }));
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);
export const delProduct = createAsyncThunk(
  'delProduct',
  async ({ id, categoryId, brandId }, { rejectWithValue, dispatch }) => {
    try {
      console.log(id);
      const response = await adminApi.delProduct(id);
      dispatch(getListProduct({ categoryId, brandId }));
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
  'updateProduct',
  async ({ values, id }, { rejectWithValue, dispatch }) => {
    console.log(values, id);
    try {
      const response = await adminApi.updateProduct(values, id);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);
export const updateStatus = createAsyncThunk(
  'delProduct',
  async ({ values, id }, { rejectWithValue, dispatch }) => {
    try {
      console.log(values, id);
      const response = await adminApi.updateStatus(values, id);
      dispatch(getListOrder());
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getOrderDetail = createAsyncThunk(
  'delProduct',
  async (payload, { rejectWithValue, dispatch }) => {
    try {
      const response = await adminApi.getOrderDetail(payload);

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
    orderDetail: {},
    totalProduct: '',
    loading: false,
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
      state.loading = true;
      state.status = 'getListProduct.pending';
    },
    [getListProduct.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.listProduct = payload;
      state.status = 'getListProduct.fullfilled';
    },
    [getListProduct.rejected]: (state, { payload }) => {
      state.errorMessage = 'bị lỗi';
      state.status = 'getListProduct.rejected';
    },

    [getTotalProduct.pending]: (state) => {
      state.status = 'getTotalProduct.pending';
    },
    [getTotalProduct.fulfilled]: (state, { payload }) => {
      state.totalProduct = payload;
      state.status = 'getTotalProduct.fullfilled';
    },
    [getTotalProduct.rejected]: (state, { payload }) => {
      state.errorMessage = 'bị lỗi';
      state.status = 'getTotalProduct.rejected';
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
      state.loading = true;
      state.status = 'addNewProduct.pending';
    },
    [addNewProduct.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.newProduct = payload;
      state.status = 'addNewProduct.fullfilled';
    },
    [addNewProduct.rejected]: (state, { payload }) => {
      state.errorMessage = 'bị lỗi';
      state.status = 'addNewProduct.rejected';
    },

    [delProduct.pending]: (state) => {
      state.loading = true;
      state.status = 'delProduct.pending';
    },
    [delProduct.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.status = 'delProduct.fullfilled';
    },
    [delProduct.rejected]: (state, { payload }) => {
      state.errorMessage = 'bị lỗi';
      state.status = 'delProduct.rejected';
    },
    [getOrderDetail.pending]: (state) => {
      state.status = 'getOrderDetail.pending';
    },
    [getOrderDetail.fulfilled]: (state, { payload }) => {
      state.orderDetail = payload;
      state.status = 'getOrderDetail.fullfilled';
    },
    [getOrderDetail.rejected]: (state, { payload }) => {
      state.errorMessage = 'bị lỗi';
      state.status = 'getOrderDetail.rejected';
    },
  },
});

const { actions, reducer } = adminSlice;
export default reducer;
export const { clearState } = actions;
