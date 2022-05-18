import React from 'react';
import {
  HomeOutlined,
  ShoppingCartOutlined,
  ProfileOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Layout as LibLayout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import './slideBar.scss';
const { Sider } = LibLayout;
const SlideBar = () => {
  return (
    <Sider trigger={null} className="sidebar" collapsible width="250">
      <div className="header__slider">
        <div className="logo">
          <i className="fas fa-laptop"></i>
        </div>
        <span className="name">TechStore</span>
      </div>
      <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
        <Menu.Item key="1">
          <Link to="/">
            <HomeOutlined />
            <span>Dashboard</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/product">
            <ProfileOutlined />
            <span>Product</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link to="/customer">
            <UserOutlined />
            <span>Customer</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="4">
          <Link to="/orders">
            <ShoppingCartOutlined />
            <span>Orders</span>
          </Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default SlideBar;
