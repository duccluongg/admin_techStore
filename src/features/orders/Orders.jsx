import React, { useEffect, useState } from 'react';
import Header from '../../components/header/Header';
import SlideBar from '../../components/slideBar/slideBar';
import { useDispatch, useSelector } from 'react-redux';
import { getListOrder } from '../../utils/AdminSlice';
import { Table, Tag, Space } from 'antd';
import './Order.scss';
import OrderModal from './OrderModal';
const Orders = () => {
  const dispatch = useDispatch();
  const listOrder = useSelector((s) => s.admin.listOrder) || [];
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    dispatch(getListOrder());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getIdOrder = (id) => {
    setIsModalVisible(true);
    console.log(id);
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
              handleCancel={handleCancel}
              isModalVisible={isModalVisible}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
