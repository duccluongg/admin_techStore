import React, { useEffect } from 'react';
import { Modal, Form, Input, Select, Button } from 'antd';
import { useDispatch } from 'react-redux';
import { updateStatus } from '../../utils/AdminSlice';
import Swal from 'sweetalert2';
const OrderModal = ({
  isModalVisible,
  handleCancel = () => {},
  orderDetail = {},
}) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { Option } = Select;
  const status = [
    { id: 1, status: 'confirmed' },
    { id: 2, status: 'waiting_confirm' },
    { id: 3, status: 'shipping' },
  ];

  useEffect(() => {
    form.setFieldsValue({
      name: orderDetail?.name,
      address: orderDetail?.address,
      phone_number: orderDetail?.phone_number,
      shipping_fee: orderDetail?.shipping_fee,
      total_cost: orderDetail?.total_cost,
      status: orderDetail?.status,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderDetail?.id]);

  console.log(orderDetail?.id);

  const onFinish = (values) => {
    dispatch(updateStatus({ values: values, id: orderDetail?.id }));
    handleCancel();
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Success',
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <Modal
      title="Edit Order"
      visible={isModalVisible}
      onCancel={handleCancel}
      width={600}
      footer={[
        <Button onClick={handleCancel}>Cancel</Button>,
        <Button type="primary" key="submit" htmlType="submit" form="myForm">
          Submit
        </Button>,
      ]}
    >
      <Form
        className="box__addProduct"
        id="myForm"
        form={form}
        onFinish={onFinish}
      >
        <div className="box__textArea">
          <div className="box__textArea__item">
            <div className="name">
              Name: <span>*</span>
            </div>
            <Form.Item name="name">
              <Input />
            </Form.Item>
          </div>
          <div className="box__textArea__item">
            <div className="name">
              Address: <span>*</span>
            </div>
            <Form.Item name="address">
              <Input rows={4} />
            </Form.Item>
          </div>
        </div>
        <div className="box__add__type">
          <div className="box__add__type__category">
            <div className="name">
              Phone: <span>*</span>
            </div>
            <Form.Item name="phone_number">
              <Input rows={4} />
            </Form.Item>
          </div>
          <div className="box__add__type__brand">
            <div className="name">
              Status: <span>*</span>{' '}
            </div>
            <Form.Item name="status">
              <Select showSearch>
                {status.map((item) => (
                  <Option key={item.id} value={item.status}>
                    {item.status}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </div>
        </div>
        <div className="box__add__price">
          <div className="box__add__price__price">
            <div className="name">
              Shipping Fee: <span>*</span>
            </div>
            <Form.Item name="shipping_fee">
              <Input rows={4} />
            </Form.Item>
          </div>
          <div className="box__add__price__salePrice">
            <div className="name">
              Total Cost: <span>*</span>{' '}
            </div>
            <Form.Item name="total_cost">
              <Input rows={4} />
            </Form.Item>
          </div>
        </div>
      </Form>
    </Modal>
  );
};

export default OrderModal;
