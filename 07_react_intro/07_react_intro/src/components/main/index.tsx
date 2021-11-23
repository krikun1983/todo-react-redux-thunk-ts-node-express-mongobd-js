import React, { useState } from 'react';
import NotesBody from './notes-body';
import style from './Main.module.scss';
import BtnAddNote from './btn-add-note';
import Modal from './modal';
import { DataNotes } from '../../store/types/notes';

const Main: React.FC = () => {
  const [isModalAddShow, setModalAddShow] = useState<boolean>(false);
  const [isModalUpdateShow, setModalUpdateShow] = useState<boolean>(false);
  const [notes, setNotes] = useState<DataNotes>();

  const onOpenNotes = (note: DataNotes) => {
    setModalUpdateShow(true);
    setNotes(note);
  };

  const onShowModalAdd = () => {
    setModalAddShow(true);
  };

  const onCloseModalAdd = () => {
    setModalAddShow(false);
    setModalUpdateShow(false);
  };

  return (
    <main className={style.main}>
      <NotesBody onOpenNotes={onOpenNotes} />
      <BtnAddNote onShowModalAdd={onShowModalAdd} />
      {isModalAddShow ? <Modal onCloseModalAdd={onCloseModalAdd} /> : ''}
      {isModalUpdateShow ? <Modal onCloseModalAdd={onCloseModalAdd} notes={notes} /> : ''}
    </main>
  );
};

export default Main;
