import React from 'react';
import { BtnAddProps } from '../../../store/types/btn-add';
import style from './BtnAddNote.module.scss';

const BtnAddNote: React.FC<BtnAddProps> = ({ onShowModalAdd }) => {
  return (
    <div className={style.btns}>
      <button className={style.btn} type="button" onClick={onShowModalAdd}>
        +
      </button>
    </div>
  );
};

export default BtnAddNote;
