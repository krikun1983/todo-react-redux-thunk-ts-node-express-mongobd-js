import React, {MouseEvent} from 'react';
import cn from 'classnames';
import style from './style/Button.module.scss';
import IconSvg from '../IconSVG';

type ButtonProps = {
  type: 'button' | 'submit';
  variant: string;
  text?: string;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
};

const Button: React.FC<ButtonProps> = ({type, variant, text, onClick}) => {
  return (
    <>
      <button
        className={cn(style.ui_btns, style[`ui_btn_${variant}`])}
        type={type}
        onClick={onClick}
      >
        {variant === 'basket' && (
          <IconSvg name="basket" width="30" height="32" className="basket_gray_white" />
        )}
        {text && text}
      </button>
    </>
  );
};

export default Button;
