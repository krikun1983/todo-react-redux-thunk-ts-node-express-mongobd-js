import React, {FormEvent, useState} from 'react';
import useTypeSelector from '../../../store/hooks/useTypeSelector';
import {DataNotes} from '../../../store/types/notes';
import {search} from '../../../utils/search';
import FormAddUpdate from '../Form-add-update-note/Form-add-update';
import Notes from './Notes';
import style from './NotesBody.module.scss';

const NotesList: React.FC = () => {
  const [isOpenForm, setIsOpenForm] = useState<boolean>(false);
  const [notes, setNotes] = useState<DataNotes>();

  const {dataNotesArray} = useTypeSelector(state => state.dataNotesArray);
  const {searchValueState} = useTypeSelector(state => state.searchValueState);
  const searchValue = search(dataNotesArray, searchValueState);

  const handleOpenForm = (note: DataNotes) => {
    setIsOpenForm(true);
    setNotes(note);
  };

  const handleCloseForm = () => {
    setIsOpenForm(false);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('update nodes');
  };

  return (
    <>
      <ul className={style.notes_group}>
        {searchValue.map(item => {
          const {id, ...rest} = item;
          return (
            <li className={style.notes_group__item} onClick={() => handleOpenForm(item)} key={id}>
              <Notes {...rest} />
            </li>
          );
        })}
      </ul>
      {isOpenForm && (
        <FormAddUpdate
          isOpenForm={isOpenForm}
          onCloseForm={handleCloseForm}
          onSubmitForm={handleSubmit}
          notes={notes}
        />
      )}
    </>
  );
};

export default NotesList;
