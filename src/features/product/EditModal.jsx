import React, { useEffect } from 'react';
import { Modal, Form, Input, Select, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {
  getListCategory,
  getListBrand,
  updateProduct,
} from '../../utils/AdminSlice';
import Swal from 'sweetalert2';
const EditModal = ({ showEditModal, isEditModalOk = () => {} }) => {
  const dispatch = useDispatch();
  const category = useSelector((s) => s.admin.listCategory) || [];
  const brand = useSelector((s) => s.admin.listBrand) || [];
  const productDetail = useSelector((s) => s.admin.productDetail) || {};
  const [form] = Form.useForm();
  const { Option } = Select;
  const { TextArea } = Input;

  useEffect(() => {
    form.setFieldsValue({
      name: productDetail?.name,
      thumbnail: productDetail?.thumbnail,
      category_id: productDetail?.category?.name,
      brand_id: productDetail?.brand?.name,
      price: productDetail?.price,
      sale_price: productDetail?.sale_price,
      specifications: productDetail?.specifications,
      short_description: productDetail?.short_description,
      description: productDetail?.description,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productDetail?.id]);

  const onFinish = (values) => {
    dispatch(updateProduct({ values: values, id: productDetail?.id }));
    isEditModalOk();
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Success',
      showConfirmButton: false,
      timer: 1500,
    });
  };

  useEffect(() => {
    dispatch(getListCategory());
    dispatch(getListBrand());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Modal
      title="Edit Product"
      visible={showEditModal}
      onCancel={isEditModalOk}
      width={600}
      // footer={[
      //   <Button onClick={isEditModalOk}>Cancel</Button>,
      //   <Button type="primary" key="submit" htmlType="submit" form="myForm">
      //     Submit
      //   </Button>,
      // ]}
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
            <Form.Item
              name="name"
              rules={[
                {
                  required: true,
                  message: 'Please fill Name Product!',
                },
              ]}
            >
              <TextArea rows={4} />
            </Form.Item>
          </div>
          <div className="box__textArea__item">
            <div className="name">
              Image: <span>*</span>
            </div>
            <Form.Item
              name="thumbnail"
              rules={[
                {
                  required: true,
                  message: 'Please fill Image Product!',
                },
              ]}
            >
              <Input rows={4} />
            </Form.Item>
          </div>
        </div>
        <div className="box__add__type">
          <div className="box__add__type__category">
            <div className="name">
              Category: <span>*</span>
            </div>
            <Form.Item
              name="category_id"
              rules={[
                {
                  required: true,
                  message: 'Please choose your category!',
                },
              ]}
            >
              <Select>
                {category.map((item) => (
                  <Option key={item.id} value={item.id}>
                    {item.name}
                  </Option>
                ))}
              </Select>
              {/* <Selection listLevel={level} /> */}
            </Form.Item>
          </div>
          <div className="box__add__type__brand">
            <div className="name">
              Brand: <span>*</span>{' '}
            </div>
            <Form.Item
              name="brand_id"
              rules={[
                {
                  required: true,
                  message: 'Please choose your brand!',
                },
              ]}
            >
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
              Price: <span>*</span>
            </div>
            <Form.Item
              name="price"
              rules={[
                {
                  required: true,
                  message: 'Please fill Product Price!',
                },
              ]}
            >
              <Input rows={4} />
            </Form.Item>
          </div>
          <div className="box__add__price__salePrice">
            <div className="name">
              Sale Price: <span>*</span>{' '}
            </div>
            <Form.Item
              name="sale_price"
              rules={[
                {
                  required: true,
                  message: 'Please fill Sale Price!',
                },
              ]}
            >
              <Input rows={4} />
            </Form.Item>
          </div>
        </div>
        <div className="box__textArea">
          <div className="box__textArea__item">
            <div className="name">
              Specifications: <span>*</span>
            </div>
            <Form.Item
              name="specifications"
              rules={[
                {
                  required: true,
                  message: 'Please fill Specifications!',
                },
              ]}
            >
              <TextArea rows={4} />
            </Form.Item>
          </div>
          <div className="box__textArea__item">
            <div className="name">
              Short Description: <span>*</span>
            </div>
            <Form.Item
              name="short_description"
              rules={[
                {
                  required: true,
                  message: 'Please fill Short Description!',
                },
              ]}
            >
              <TextArea rows={4} />
            </Form.Item>
          </div>
          <div className="box__textArea__item">
            <div className="name">
              Description: <span>*</span>
            </div>
            <Form.Item
              name="description"
              rules={[
                {
                  required: true,
                  message: 'Please fill your Description!',
                },
              ]}
            >
              <TextArea rows={4} />
            </Form.Item>
          </div>
        </div>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditModal;
