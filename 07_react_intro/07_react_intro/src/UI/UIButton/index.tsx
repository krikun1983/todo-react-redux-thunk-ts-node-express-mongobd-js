import React from 'react';
import UiButtonProps from './type/ui-button-props';
import './uIButton.scss';

const UIButton: React.FC<UiButtonProps> = ({text, type, onClick, variant}) => {
  return (
    <>
      <button className={`ui_btns ui_btn_${variant}`} type={type} onClick={onClick}>
        {text}
      </button>
    </>
  );
};

export default UIButton;
