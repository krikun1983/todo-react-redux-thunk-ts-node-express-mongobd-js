import React from 'react';
import cn from 'classnames';
import style from './Input.module.scss';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id?: string;
  styles: string;
  name?: string;
  width?: string;
  height?: string;
}

export enum InputNameEnum {
  CHECKBOX = 'checkbox',
  TEXT = 'text',
}

const Input: React.FC<InputProps> = ({
  styles,
  value,
  checked,
  width,
  height,
  id,
  ...attr
}) => {
  return (
    <>
      <input
        {...attr}
        style={{width: width, height: height}}
        className={cn(style.ui_input, style[styles])}
        checked={checked}
        value={value}
        id={id}
      />
    </>
  );
};

export default Input;
