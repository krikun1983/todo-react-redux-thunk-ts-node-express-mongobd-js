import React from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import style from './NotFoundPage.module.scss';
import img from './img/404.png';
import {Button} from 'UI-Kit';

const NotFoundPage: React.FC = () => {
  const location = useLocation();
  const navigation = useNavigate();

  return (
    <>
      <div className={style.not__found}>
        <img src={img} alt="404" className={style.not__found_img} />
        <p className={style.not__found_text}>
          No match for <u>{location.pathname}</u>
        </p>
        <Button text="Back" styles="btn_blue" onClick={() => navigation(-1)} />
      </div>
    </>
  );
};

export default NotFoundPage;
