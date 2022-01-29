import React from 'react';
import cn from 'classnames';
import style from './Button.module.scss';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  styles: string;
  text?: string;
  icon?: React.ReactElement;
  ref?: React.MutableRefObject<HTMLButtonElement>;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({styles, text, icon, ...attr}, ref) => {
    return (
      <>
        <button
          ref={ref}
          {...attr}
          className={cn(style.ui_btns, text && style.ui_btn, style[styles])}
        >
          {icon ? icon : text}
        </button>
      </>
    );
  },
);

Button.displayName = 'MyButton';

export default Button;
