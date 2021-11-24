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
      {isModalAddShow && <Modal onCloseModalAdd={onCloseModalAdd} />}
      {isModalUpdateShow && <Modal onCloseModalAdd={onCloseModalAdd} notes={notes} />}
      <UIButton
        text="+"
        type="button"
        onClick={onShowModalAdd}
        variant={EnumUIButton.add_new_note}
      />
    </main>
  );
};

export default Main;
