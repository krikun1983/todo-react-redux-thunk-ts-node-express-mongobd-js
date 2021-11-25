import React, {MouseEvent} from 'react';
import cn from 'classnames';
import style from './style/Button.module.scss';

type ButtonProps = {
  text?: string;
  type: 'button' | 'submit';
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  variant: string;
};

const Button: React.FC<ButtonProps> = ({text, type, onClick, variant}) => {
  return (
    <>
      <button
        className={cn(style.ui_btns, style[`ui_btn_${variant}`])}
        type={type}
        onClick={onClick}
      >
        {text}
      </button>
    </>
  );
};

export default Button;
