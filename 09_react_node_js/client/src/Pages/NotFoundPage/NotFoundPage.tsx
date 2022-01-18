import React from 'react';
import {useLocation} from 'react-router-dom';
import style from './NotFoundPage.module.scss';
import img from './img/404.png';

const NotFoundPage: React.FC = () => {
  const location = useLocation();
  return (
    <>
      <div className={style.not__found}>
        <img src={img} alt="404" className={style.not__found_img} />
        <p className={style.not__found_text}>
          No match for <u>{location.pathname}</u>
        </p>
      </div>
    </>
  );
};

export default NotFoundPage;
