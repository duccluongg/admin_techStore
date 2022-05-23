import React, { useEffect, useState } from 'react';
import './Customer.scss';
import Header from '../../components/header/Header';
import SlideBar from '../../components/slideBar/slideBar';
import { useDispatch, useSelector } from 'react-redux';
import { getListUser } from '../../utils/AdminSlice';
import { Table, Space } from 'antd';
import { delUser } from '../../utils/AdminSlice';
import Swal from 'sweetalert2';
import ClipLoader from 'react-spinners/ClipLoader';
const Customer = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const listUser = useSelector((s) => s.admin.listUser) || [];

  setTimeout(() => {
    setLoading(false);
  }, 1500);

  useEffect(() => {
    dispatch(getListUser());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getIdUser = (id) => {
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
        Swal.fire('Deleted!', 'Your Product has been deleted.', 'success');
        dispatch(delUser(id));
      }
    });
  };

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
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Phone',
      dataIndex: 'phone_number',
      key: 'phone_number',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Action',
      key: 'action',
      render: (record) => (
        <Space className="customer__table__btnDel" size="middle">
          <i onClick={() => getIdUser(record.id)} className="fas fa-trash"></i>
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
            <div className="container__customer">
              <div className="container__customer__header">Customer</div>
              <div className="container__customer__table">
                <Table columns={columns} dataSource={listUser} />;
              </div>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default Customer;
