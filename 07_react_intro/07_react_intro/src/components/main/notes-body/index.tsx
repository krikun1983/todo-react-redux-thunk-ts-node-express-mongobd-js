import React from 'react';
import useTypeSelector from '../../../store/hooks/useTypeSelector';
import { DataNotes } from '../../../store/types/notes';
import Notes from './notes';
import style from './NotesBody.module.scss';

type Props = {
  onOpenNotes: (note: DataNotes) => void;
};

const NotesBody: React.FC<Props> = ({ onOpenNotes }) => {
  const { dataNotesArray } = useTypeSelector(state => state.dataNotesArray);

  return (
    <>
      <ul className={style.notes_group}>
        {dataNotesArray.map(item => {
          const { id, ...rest } = item;
          return (
            <li className={style.notes_group__item} onClick={() => onOpenNotes(item)} key={id}>
              <Notes {...rest} />
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default NotesBody;
