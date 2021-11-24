import React from 'react';
import NotesList from './Notes-list';
import FormAddUpdateNote from './Form-add-update-note';
import style from './Main.module.scss';

const Main: React.FC = () => {
  return (
    <main className={style.main}>
      <NotesList />
      <FormAddUpdateNote />
    </main>
  );
};

export default Main;
