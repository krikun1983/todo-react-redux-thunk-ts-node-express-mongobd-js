import React, {ButtonHTMLAttributes, MouseEvent} from 'react';
import cn from 'classnames';
import style from './style/Button.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  styles: string;
  icon?: React.ReactElement;
  text?: string;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.FC<ButtonProps> = ({styles, text, onClick, icon, ...attr}) => {
  return (
    <>
      <button {...attr} className={cn(style.ui_btns, style[styles])} onClick={onClick}>
        {icon ? icon : text}
      </button>
    </>
  );
};

export default Button;
