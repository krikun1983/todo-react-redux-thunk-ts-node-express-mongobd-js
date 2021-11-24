import React, {useState} from 'react';
import style from './Main.module.scss';
import BtnAddNote from './btn-add-note';
import Modal from './modal';
import {DataNotes} from '../../store/types/notes';
import NotesList from './notes-list';

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
      <NotesList onOpenNotes={onOpenNotes} />
      <BtnAddNote onShowModalAdd={onShowModalAdd} />
      {isModalAddShow && <Modal onCloseModalAdd={onCloseModalAdd} />}
      {isModalUpdateShow && <Modal onCloseModalAdd={onCloseModalAdd} notes={notes} />}
    </main>
  );
};

export default Main;
