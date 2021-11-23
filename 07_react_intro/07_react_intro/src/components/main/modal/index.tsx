import React, { FormEvent } from 'react';
import style from './Modal.module.scss';

interface Props {
  onCloseModalAdd: () => void;
}

const Modal: React.FC<Props> = ({ onCloseModalAdd }) => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('add nodes');
  };

  return (
    <div className={style.form_add__container}>
      <form className={style.form_add} onSubmit={handleSubmit}>
        <input type="text" className={style.form_add__input} placeholder="Enter title" />
        <textarea className={style.form_add__text} placeholder="note text" />
        <div className={style.form_add__btns}>
          <button className={style.form_add__btns_create} type="submit">
            Create
          </button>
          <button className={style.form_add__btns_cancel} type="button" onClick={onCloseModalAdd}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default Modal;
