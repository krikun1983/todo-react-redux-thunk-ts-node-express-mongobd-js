import React from 'react';
import Notes from './notes';
import style from './NotesBody.module.scss';

const NotesBody = (): JSX.Element => {
  const onOpenNotes = () => {
    console.log('Open Notes');
  };

  return (
    <>
      <ul className={style.notes_group}>
        <li className={style.notes_group__item} onClick={onOpenNotes}>
          <Notes />
        </li>
      </ul>
    </>
  );
};

export default NotesBody;
