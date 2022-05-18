import React from 'react';
import './Header.scss';
import { Menu, Dropdown } from 'antd';
import storageUser from '../../constants/storageUser';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem(storageUser.TOKEN);
    navigate('/login');
  };

  const menu = (
    <Menu
      items={[
        {
          label: <span onClick={logout}>Logout</span>,
        },
      ]}
    />
  );

  return (
    <div className="header__component">
      <div className="box__header">
        <div className="box__header__img">
          <img
            src="https://cdn.chanhtuoi.com/uploads/2022/01/avatar-tet.jpg.webp"
            alt=""
          />
        </div>
        <div className="box__header__name">
          <Dropdown overlay={menu} placement="bottom" arrow>
            <div className="box__header__name__name">Luong Le</div>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default Header;
