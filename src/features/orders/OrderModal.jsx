import React, { useEffect } from 'react';
import { Modal, Form, Input, Select, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getListBrand } from '../../utils/AdminSlice';
import Swal from 'sweetalert2';
const OrderModal = ({ isModalVisible, handleCancel = () => {} }) => {
  const dispatch = useDispatch();
  const brand = useSelector((s) => s.admin.listBrand) || [];
  const [form] = Form.useForm();
  const { Option } = Select;
  const productDetail = useSelector((s) => s.admin.productDetail) || {};
  console.log(productDetail);

  const onFinish = (values) => {
    // dispatch(addNewProduct(values));
    // isAddModalClose();
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Success',
      showConfirmButton: false,
      timer: 1500,
    });
    form.resetFields();
  };

  useEffect(() => {
    dispatch(getListBrand());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
            <Form.Item name="category_id">
              <Input rows={4} />
            </Form.Item>
          </div>
          <div className="box__add__type__brand">
            <div className="name">
              Status: <span>*</span>{' '}
            </div>
            <Form.Item name="brand_id">
              <Select showSearch>
                {brand.map((item) => (
                  <Option key={item.id} value={item.id}>
                    {item.name}
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
