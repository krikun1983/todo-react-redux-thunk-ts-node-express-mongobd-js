import React from 'react';
import style from './Main.module.scss';
import NotesList from './notes-list';
import FormAddUpdateNote from './form-add-update-note';

const Main: React.FC = () => {
  return (
    <main className={style.main}>
      <NotesList />
      <FormAddUpdateNote />
    </main>
  );
};

export default Main;
