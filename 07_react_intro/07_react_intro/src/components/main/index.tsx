import React, {useState} from 'react';
import style from './Main.module.scss';
import Modal from './modal';
import {DataNotes} from '../../store/types/notes';
import NotesList from './notes-list';
import UIButton from '../../UI/UIButton';
import EnumUIButton from '../../UI/UIButton/type/enum-ui-button';

const Main: React.FC = () => {
  const [isModalAddShow, setModalAddShow] = useState<boolean>(false);
  const [isModalUpdateShow, setModalUpdateShow] = useState<boolean>(false);
  const [notes, setNotes] = useState<DataNotes>();

  const handelOpenNotes = (note: DataNotes) => {
    setModalUpdateShow(true);
    setNotes(note);
  };

  const handelShowModalAdd = () => {
    setModalAddShow(true);
  };

  const handelCloseModalAdd = () => {
    setModalAddShow(false);
    setModalUpdateShow(false);
  };

  return (
    <main className={style.main}>
      <NotesList onOpenNotes={handelOpenNotes} />
      {isModalAddShow && <Modal onCloseModalAdd={handelCloseModalAdd} />}
      {isModalUpdateShow && <Modal onCloseModalAdd={handelCloseModalAdd} notes={notes} />}
      <UIButton
        text="+"
        type="button"
        onClick={handelShowModalAdd}
        variant={EnumUIButton.add_new_note}
      />
    </main>
  );
};

export default Main;
