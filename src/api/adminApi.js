import axiosClient from './axiosClient';
import URL from '../constants/api';
import storageUser from '../constants/storageUser.js';

function adminLogin(data) {
  return axiosClient.post(URL.login, data);
}

function adminInfor() {
  return axiosClient.get(URL.adminInfor, {
    headers: {
      Authorization: `${localStorage.getItem(storageUser.TOKEN)}`,
    },
  });
}

function getListUser() {
  return axiosClient.get(URL.getListUser, {
    headers: {
      Authorization: `${localStorage.getItem(storageUser.TOKEN)}`,
    },
  });
}

function getListOrder() {
  return axiosClient.get(URL.getListOrder, {
    headers: {
      Authorization: `${localStorage.getItem(storageUser.TOKEN)}`,
    },
  });
}
function getListProduct({ categoryId, brandId }) {
  console.log(categoryId, brandId);
  return axiosClient.get(
    URL.getListProduct +
      `lite?page=1&page_size=20&category=${categoryId}&brand=${brandId}`
  );
}

function getTotalProduct() {
  return axiosClient.get(URL.getListProduct);
}

function getListCategory() {
  return axiosClient.get(URL.getListCategory);
}

function getListBrand() {
  return axiosClient.get(URL.getListBrand);
}

function getProductDetail(data) {
  return axiosClient.get(URL.getProductDetail + `/${data}`);
}

function addNewProduct(data) {
  return axiosClient.post(URL.addNewProduct, data, {
    headers: {
      Authorization: `${localStorage.getItem(storageUser.TOKEN)}`,
    },
  });
}

function delProduct(data) {
  return axiosClient.delete(URL.delProduct + `${data}`, {
    headers: {
      Authorization: `${localStorage.getItem(storageUser.TOKEN)}`,
    },
  });
}

function delUser(data) {
  return axiosClient.delete(URL.delUser + `/${data}`, {
    headers: {
      Authorization: `${localStorage.getItem(storageUser.TOKEN)}`,
    },
  });
}

function getOrderDetail(data) {
  return axiosClient.get(URL.orderDetail + `/${data}`, {
    headers: {
      Authorization: `${localStorage.getItem(storageUser.TOKEN)}`,
    },
  });
}

function updateStatus(values, id) {
  return axiosClient.put(URL.updateStatus + `/${id}`, values, {
    headers: {
      Authorization: `${localStorage.getItem(storageUser.TOKEN)}`,
    },
  });
}

function updateProduct(values, id) {
  return axiosClient.put(URL.updateProduct + `/${id}`, values, {
    headers: {
      Authorization: `${localStorage.getItem(storageUser.TOKEN)}`,
    },
  });
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  adminLogin,
  adminInfor,
  getListUser,
  getListOrder,
  getListProduct,
  getListCategory,
  getListBrand,
  addNewProduct,
  delProduct,
  getProductDetail,
  updateProduct,
  delUser,
  getTotalProduct,
  getOrderDetail,
  updateStatus,
};
