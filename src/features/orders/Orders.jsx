import React, { useEffect, useState } from 'react';
import Header from '../../components/header/Header';
import SlideBar from '../../components/slideBar/slideBar';
import { useDispatch, useSelector } from 'react-redux';
import { getListOrder, getOrderDetail } from '../../utils/AdminSlice';
import './Order.scss';
import OrderModal from './OrderModal';
import { Table, Tag, Space } from 'antd';
import ClipLoader from 'react-spinners/ClipLoader';

const Orders = () => {
  const dispatch = useDispatch();
  const listOrder1 = useSelector((s) => s.admin.listOrder) || [];
  const listOrder = listOrder1.slice().reverse();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const orderDetail = useSelector((s) => s.admin.orderDetail) || {};

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  setTimeout(() => {
    setLoading(false);
  }, 1500);

  useEffect(() => {
    dispatch(getListOrder());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getIdOrder = (id) => {
    setIsModalVisible(true);
    dispatch(getOrderDetail(id));
  };
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
      render: (status) => (
        <>
          <Tag color="blue">{status.toUpperCase()}</Tag>
        </>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (record) => (
        <Space size="middle">
          <i onClick={() => getIdOrder(record.id)} className="fas fa-pen"></i>
        </Space>
      ),
    },
  ];
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
            <div className="container__order">
              <div className="container__order__header">Orders</div>
              <div className="container__order__table">
                <Table columns={column1s} dataSource={listOrder} />;
                <OrderModal
                  orderDetail={orderDetail}
                  handleCancel={handleCancel}
                  isModalVisible={isModalVisible}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default Orders;
