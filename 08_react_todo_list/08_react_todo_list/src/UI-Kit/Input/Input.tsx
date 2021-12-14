import React from 'react';
import style from './Input.module.scss';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  width?: string;
  height?: string;
}

const Input: React.FC<Props> = ({value, width, height, ...attr}) => {
  return (
    <>
      <input
        {...attr}
        type="text"
        style={{width: width, height: height}}
        className={style.ui_input}
        value={value}
      />
    </>
  );
};

export default Input;
