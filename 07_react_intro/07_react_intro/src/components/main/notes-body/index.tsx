import React from 'react';
import useTypeSelector from '../../../store/hooks/useTypeSelector';
import Notes from './notes';
import style from './NotesBody.module.scss';

const NotesBody = (): JSX.Element => {
  const { dataNotesArray } = useTypeSelector(state => state.dataNotesArray);

  const onOpenNotes = () => {
    console.log('Open Notes');
  };

  return (
    <>
      <ul className={style.notes_group}>
        {dataNotesArray.map(item => {
          const { id, ...rest } = item;
          return (
            <li className={style.notes_group__item} onClick={onOpenNotes} key={id}>
              <Notes {...rest} />
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default NotesBody;
