import React from 'react';
import style from './MyInput.module.scss';
type Props = React.InputHTMLAttributes<HTMLInputElement>;

const MyInput: React.FC<Props> = props => {
  return <input className={style.my_input} {...props} />;
};

export default MyInput;
