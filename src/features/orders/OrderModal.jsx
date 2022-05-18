import React from 'react';
import { Modal } from 'antd';
const OrderModal = ({ isModalVisible, handleCancel = () => {} }) => {
  return (
    <Modal
      title="Edit"
      visible={isModalVisible}
      onOk={handleCancel}
      onCancel={handleCancel}
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Modal>
  );
};

export default OrderModal;
