import React from 'react';
import NotesBody from './notes-body';
import style from './Main.module.scss';
import BtnAddNote from './btn-add-note';

const Main: React.FC = () => {
  return (
    <main className={style.main}>
      <NotesBody />
      <BtnAddNote />
    </main>
  );
};

export default Main;
