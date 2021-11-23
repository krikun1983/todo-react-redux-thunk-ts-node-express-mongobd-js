import React from 'react';
import style from './BtnAddNote.module.scss';

const BtnAddNote = (): JSX.Element => {
  return (
    <div className={style.btns}>
      <button className={style.btn} type="button">
        +
      </button>
    </div>
  );
};

export default BtnAddNote;
