import React from 'react';
import useTypeSelector from '../../../store/hooks/useTypeSelector';
import { DataNotes } from '../../../store/types/notes';
import { search } from '../../../utils/search';
import Notes from './notes';
import style from './NotesBody.module.scss';

type Props = {
  onOpenNotes: (note: DataNotes) => void;
};

const NotesBody: React.FC<Props> = ({ onOpenNotes }) => {
  const { dataNotesArray } = useTypeSelector(state => state.dataNotesArray);
  const { searchValueState } = useTypeSelector(state => state.searchValueState);

  const searchValue = search(dataNotesArray, searchValueState);

  return (
    <>
      <ul className={style.notes_group}>
        {searchValue.map(item => {
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
