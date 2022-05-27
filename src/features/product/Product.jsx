import React, { useEffect, useState } from 'react';
import SlideBar from '../../components/slideBar/slideBar';
import Header from '../../components/header/Header';
import './Product.scss';
import FormatCash from '../../constants/FormatCash';
import ClipLoader from 'react-spinners/ClipLoader';
import storageUser from '../../constants/storageUser';
import { useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import { Select, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import PulseLoader from 'react-spinners/PulseLoader';
import {
  getListCategory,
  getListBrand,
  delProduct,
  getListProduct,
  getProductDetail,
} from '../../utils/AdminSlice';
import AddModal from './AddModal';
import EditModal from './EditModal';
import Swal from 'sweetalert2';

const Product = () => {
  const { Option } = Select;
  const [loading, setLoading] = useState(true);
  const [smallLoading, setSmallLoading] = useState(false);
  const dispatch = useDispatch();
  const category = useSelector((s) => s.admin.listCategory) || [];
  const brand = useSelector((s) => s.admin.listBrand) || [];
  const product = useSelector((s) => s.admin.listProduct) || [];
  const testLoading = useSelector((s) => s.admin.loading);
  const [brandId, setBrandId] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const navigate = useNavigate();
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  console.log(testLoading);

  const showAddModal = () => {
    setAddModal(true);
  };

  const showEditModal = () => {
    setEditModal(true);
  };
  const editProduct = (id) => {
    showEditModal();
    dispatch(getProductDetail(id));
  };

  const isEditModalOk = () => {
    setEditModal(false);
  };

  const isAddModalOk = () => {
    setAddModal(false);
  };

  useEffect(() => {
    dispatch(getListCategory());
    dispatch(getListBrand());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filters = {
    page_size: 20,
    page: 1,
  };

  const param = queryString.stringify(filters);

  setTimeout(() => {
    setLoading(false);
  }, 1500);

  useEffect(() => {
    const token = localStorage.getItem(storageUser.TOKEN);
    if (!token) {
      navigate('/login');
    }
  });

  function getCategoryId(value) {
    setCategoryId(value);
  }

  function getBrandId(value) {
    setBrandId(value);
  }

  useEffect(() => {
    dispatch(getListProduct({ categoryId, brandId }));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId, brandId]);

  const getProductId = ({ id, categoryId, brandId }) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        setSmallLoading(true);
        dispatch(delProduct({ id, categoryId, brandId }));
        console.log({ id, category, brand });
        setTimeout(() => {
          setSmallLoading(false);
        }, 1000);
        Swal.fire('Deleted!', 'Your Product has been deleted.', 'success');
      }
    });
  };

  return (
    <React.Fragment>
      {loading ? (
        <div className="sweetLoading">
          <ClipLoader loading={loading} size={50} />
        </div>
      ) : (
        <div className="container">
          <div className="container__col3">
            <SlideBar />
          </div>
          <div className="container__col7">
            <Header />
            <div className="home__product">
              <div className="container__col7__box__name">Product</div>
              <div className="container__col7__box__select">
                <Select
                  defaultValue="Category"
                  style={{ width: 200, marginRight: 30 }}
                  onChange={getCategoryId}
                >
                  {category.map((item) => (
                    <Option key={item.id} value={item.id}>
                      {item.name}
                    </Option>
                  ))}
                </Select>
                <Select
                  defaultValue="Brand"
                  style={{ width: 200, marginRight: 30 }}
                  onChange={getBrandId}
                >
                  {brand.map((item) => (
                    <Option key={item.id} value={item.id}>
                      {item.name}
                    </Option>
                  ))}
                </Select>
                <Button
                  style={{ marginRight: 30 }}
                  type="primary"
                  onClick={showAddModal}
                >
                  Add Product
                </Button>
                <AddModal
                  addModal={addModal}
                  isAddModalOk={isAddModalOk}
                  isAddModalClose={isAddModalOk}
                />
                <EditModal
                  showEditModal={editModal}
                  isEditModalOk={isEditModalOk}
                />
              </div>
              {testLoading ? (
                <div className="loading">
                  <PulseLoader loading={testLoading} size={13} />
                </div>
              ) : (
                <div className="grid__row">
                  {product.length === 0 ? (
                    <div className="noItem">
                      <div className="boxImg">
                        <img
                          src="https://prague.extranet-aec.com/img/empty-cart.png"
                          alt=""
                        />
                      </div>
                      <div>Cửa hàng chưa có loại sản phẩm này</div>
                    </div>
                  ) : (
                    product
                      .slice()
                      .reverse()
                      .map((item) => (
                        <div key={item.id} className="grid__column24">
                          <div className="home__productitems">
                            <div
                              className="home__productitemsimg"
                              style={{
                                backgroundImage: `url(${item.thumbnail})`,
                              }}
                            ></div>
                            <h4 className="home__productitemsname">
                              {item.name}
                            </h4>
                            <div className="ant-alerthome__productprice">
                              <span className="ant-alerthome__productitemsprice">
                                {FormatCash(item.sale_price.toString())} đ
                              </span>
                              <div className="ant-alertbtn_cart">
                                <span
                                  className="btn__edit"
                                  onClick={() => editProduct(item.id)}
                                >
                                  <i className="fas fa-pen"></i>
                                </span>
                                <span
                                  className="btn__del"
                                  onClick={() =>
                                    getProductId({
                                      id: item.id,
                                      categoryId: item?.category.id,
                                      brandId: item?.brand.id,
                                    })
                                  }
                                >
                                  <i className="fas fa-trash"></i>
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default Product;
