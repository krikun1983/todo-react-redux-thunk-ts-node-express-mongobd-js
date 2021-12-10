import React, {ButtonHTMLAttributes, MouseEvent} from 'react';
import cn from 'classnames';
import style from './Button.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  styles: string;
  text?: string;
  icon?: React.ReactElement;
  width?: string;
  height?: string;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.FC<ButtonProps> = ({
  styles,
  text,
  icon,
  width,
  height,
  onClick,
  ...attr
}) => {
  return (
    <>
      <button
        {...attr}
        style={{width: width, height: height}}
        className={cn(style.ui_btns, text && style.ui_btn, style[styles])}
        onClick={onClick}
      >
        {icon ? icon : text}
      </button>
    </>
  );
};

export default Button;
