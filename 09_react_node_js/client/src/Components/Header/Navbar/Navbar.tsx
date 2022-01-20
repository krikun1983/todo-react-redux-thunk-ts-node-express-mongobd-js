import AuthContext from 'context/authContext';
import React, {useContext} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import style from './NavBar.module.scss';

const NavBar: React.FC = () => {
  const navigation = useNavigate();
  const auth = useContext(AuthContext);
  const handleLogout = () => {
    auth.logout();
    navigation('/');
  };
  return (
    <nav className={style.menu}>
      <div className={style.menu__username}>Username: {auth.userName}</div>
      <Link to="/" className={style.menu__links} onClick={handleLogout}>
        Выйти
      </Link>
    </nav>
  );
};

export default NavBar;
