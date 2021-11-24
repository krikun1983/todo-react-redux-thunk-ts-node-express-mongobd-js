import React from 'react';
import UiButtonProps from './type/ui-button-props';
import cn from 'classnames';
import style from './style/UIButton.module.scss';

const UIButton: React.FC<UiButtonProps> = ({text, type, onClick, variant}) => {
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

export default UIButton;
