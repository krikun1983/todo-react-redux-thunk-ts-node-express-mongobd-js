import React from 'react';
import NotesList from './Notes-list';
import style from './Main.module.scss';

const Main: React.FC = () => {
  return (
    <main className={style.main}>
      <NotesList />
    </main>
  );
};

export default Main;
