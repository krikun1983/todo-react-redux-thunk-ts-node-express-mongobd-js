import React, {ButtonHTMLAttributes, MouseEvent} from 'react';
import cn from 'classnames';
import style from './style/Button.module.scss';
import IconSvg from '../IconSVG';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: string;
  styles: string;
  text?: string;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.FC<ButtonProps> = props => {
  const {variant, styles, text, onClick, ...attr} = props;

  return (
    <>
      <button
        {...attr}
        className={cn(style.ui_btns, style[`ui_btn_${variant}`], style[styles])}
        onClick={onClick}
      >
        {variant === 'icon_basket' && (
          <IconSvg name="basket" width="30" height="32" className="basket_gray_white" />
        )}
        {variant === 'default' && text}
      </button>
    </>
  );
};

export default Button;
