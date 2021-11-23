import React, { useState } from 'react';
import NotesBody from './notes-body';
import style from './Main.module.scss';
import BtnAddNote from './btn-add-note';
import Modal from './modal';

const Main: React.FC = () => {
  const [isModalAddShow, setModalAddShow] = useState<boolean>(false);

  const onShowModalAdd = () => {
    setModalAddShow(true);
  };

  const onCloseModalAdd = () => {
    setModalAddShow(false);
  };

  return (
    <main className={style.main}>
      <NotesBody />
      <BtnAddNote onShowModalAdd={onShowModalAdd} />
      {isModalAddShow ? <Modal onCloseModalAdd={onCloseModalAdd} /> : ''}
    </main>
  );
};

export default Main;
