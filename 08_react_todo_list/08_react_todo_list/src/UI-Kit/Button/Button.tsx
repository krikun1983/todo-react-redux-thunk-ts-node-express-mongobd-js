import React, {ButtonHTMLAttributes, MouseEvent} from 'react';
import cn from 'classnames';
import style from './Button.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  styles: string;
  text: string;
  width?: string;
  height?: string;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.FC<ButtonProps> = ({
  styles,
  text,
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
        className={cn(style.ui_btns, style[styles])}
        onClick={onClick}
      >
        {text}
      </button>
    </>
  );
};

export default Button;
