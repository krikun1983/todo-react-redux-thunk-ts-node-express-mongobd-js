import React, {ChangeEvent, InputHTMLAttributes} from 'react';
import cn from 'classnames';
import style from './Input.module.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id?: string;
  styles: string;
  name?: string;
  width?: string;
  height?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
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
  onChange,
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
        onChange={onChange}
      />
    </>
  );
};

export default Input;
