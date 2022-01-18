import React from 'react';
import cn from 'classnames';
import style from './Button.module.scss';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  styles: string;
  text?: string;
  icon?: React.ReactElement;
}

const Button: React.FC<ButtonProps> = ({styles, text, icon, ...attr}) => {
  return (
    <>
      <button
        {...attr}
        className={cn(style.ui_btns, text && style.ui_btn, style[styles])}
      >
        {icon ? icon : text}
      </button>
    </>
  );
};

export default Button;
