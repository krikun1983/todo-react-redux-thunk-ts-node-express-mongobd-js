import React, {ButtonHTMLAttributes, MouseEvent} from 'react';
import cn from 'classnames';
import style from './style/Button.module.scss';
import IconSvg from '../IconSVG';

type IconSvgProp = {
  name: string;
  width: string;
  height: string;
  fill?: string;
  className?: string;
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: string;
  styles: string;
  icon?: React.ReactElement;
  text?: string;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.FC<ButtonProps> = props => {
  const {variant, styles, text, onClick, icon, ...attr} = props;

  return (
    <>
      <button
        {...attr}
        className={cn(style.ui_btns, style[`ui_btn_${variant}`], style[styles])}
        onClick={onClick}
      >
        {icon}
        {/* {variant === 'icon_basket' && ( // icon || text
          <IconSvg name="basket" width="30" height="32" className="basket_gray_white" />
        )} создать index
elepsise образало строки в три точки*/}
        {variant === 'default' && text}
      </button>
    </>
  );
};

export default Button;
