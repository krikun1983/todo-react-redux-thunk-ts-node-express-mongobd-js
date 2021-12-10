import React, {ButtonHTMLAttributes} from 'react';
import cn from 'classnames';
import style from './Button.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  styles: string;
  text?: string;
  icon?: React.ReactElement;
  width?: string;
  height?: string;
}

const Button: React.FC<ButtonProps> = ({
  styles,
  text,
  icon,
  width,
  height,
  ...attr
}) => {
  return (
    <>
      <button
        {...attr}
        style={{width: width, height: height}}
        className={cn(style.ui_btns, text && style.ui_btn, style[styles])}
      >
        {icon ? icon : text}
      </button>
    </>
  );
};

export default Button;
