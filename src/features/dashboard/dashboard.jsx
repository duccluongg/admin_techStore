import React, { useEffect, useState } from 'react';
import Header from '../../components/header/Header';
import SlideBar from '../../components/slideBar/slideBar';
import { useDispatch, useSelector } from 'react-redux';
import './dashboard.scss';
import storageUser from '../../constants/storageUser';
import { useNavigate } from 'react-router-dom';
import {
  getListOrder,
  getListUser,
  getTotalProduct,
} from '../../utils/AdminSlice';
import ClipLoader from 'react-spinners/ClipLoader';

import { Table } from 'antd';
const Dashboard = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const listUser = useSelector((s) => s.admin.listUser) || [];
  const listOrder = useSelector((s) => s.admin.listOrder) || [];
  const listProduct = useSelector((s) => s.admin.totalProduct) || '';
  console.log(listProduct);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    dispatch(getListUser());
    dispatch(getListOrder());
    dispatch(getTotalProduct());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const token = localStorage.getItem(storageUser.TOKEN);
    if (!token) {
      navigate('/login');
    }
  });

  const columns = [
    {
      title: 'User',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Roles',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Phone',
      dataIndex: 'phone_number',
      key: 'phone_number',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
  ];
  const column1s = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },

    {
      title: 'Phone',
      dataIndex: 'phone_number',
      key: 'phone_number',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Shipping Fee',
      dataIndex: 'shipping_fee',
      key: 'shipping_fee',
    },
    {
      title: 'Total Price',
      dataIndex: 'total_cost',
      key: 'total_cost',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
  ];
  useEffect(() => {}, []);

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
            <div className="container__col7__box">
              <div className="container__col7__box__name">Dashboard</div>
              <div className="container__col7__box__row">
                <div className="row__col6">
                  <div className="col6">
                    <div className="status-card">
                      <div className="status-card__icon">
                        <i class="fas fa-laptop"></i>
                      </div>
                      <div className="status-card__info">
                        <div className="status-card__info__total">
                          {listProduct}
                        </div>
                        <span>product</span>
                      </div>
                    </div>
                  </div>
                  <div className="col6">
                    <div className="status-card">
                      <div className="status-card__icon">
                        <i class="fas fa-user"></i>
                      </div>
                      <div className="status-card__info">
                        <div className="status-card__info__total">
                          {listUser.length}
                        </div>
                        <span>users</span>
                      </div>
                    </div>
                  </div>
                  <div className="col6">
                    <div className="status-card">
                      <div className="status-card__icon">
                        <i class="fas fa-receipt"></i>
                      </div>
                      <div className="status-card__info">
                        <div className="status-card__info__total">
                          {listOrder.length}
                        </div>
                        <span>Total Orders</span>
                      </div>
                    </div>
                  </div>
                  <div className="col6">
                    <div className="status-card">
                      <div className="status-card__icon">
                        <i class="fas fa-money-bill"></i>
                      </div>
                      <div className="status-card__info">
                        <div className="status-card__info__total">5,603 </div>
                        <span>Total Money</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="container__col7__box__row">
                <div className="box__row__table__costumers">
                  <div className="box__row__table__costumers__name">
                    Customers
                  </div>
                  <Table columns={columns} dataSource={listUser} />;
                </div>
                <div className="box__row__table__order">
                  <div className="box__row__table__costumers__name">
                    List Order
                  </div>
                  <Table columns={column1s} dataSource={listOrder} />;
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default Dashboard;
