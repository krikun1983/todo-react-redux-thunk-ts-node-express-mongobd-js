import React from 'react';
import NotesBody from './notes-body';
import style from './Main.module.scss';

const Main: React.FC = () => {
  return (
    <main className={style.main}>
      <NotesBody />
    </main>
  );
};

export default Main;
