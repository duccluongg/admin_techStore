import React, { useEffect } from 'react';
import './Login.scss';
import { Form, Input, Button, Checkbox } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector, adminLogin, clearState } from '../../utils/AuthSlice';
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const dispatch = useDispatch();
  const { isSuccess, isError } = useSelector(authSelector);
  const navigate = useNavigate();
  const onFinish = (values) => {
    dispatch(adminLogin(values));
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  useEffect(() => {
    if (isError) {
      // dispatch(
      //   showSnackbar({ type: SNACK_BAR_TYPE.ERROR, message: errorMessage })
      // );
      dispatch(clearState());
    }
    if (isSuccess) {
      dispatch(clearState());
      navigate('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError, isSuccess]);
  return (
    <div className="container">
      <div className="col7"></div>
      <div className="col3">
        <div className="box">
          <div className="header">
            <i className="fas fa-laptop"></i>TechStore
          </div>
          <div className="title">Just For Admin</div>
          <Form
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Please input your username!',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="remember"
              valuePropName="checked"
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
