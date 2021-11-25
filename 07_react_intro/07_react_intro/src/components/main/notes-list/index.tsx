import React, {FormEvent, useState} from 'react';
import store from '../../../store';
import {DataNotes} from '../../../store/types/notes';
import {RootState} from '../../../store/types/root-state';
import {search} from '../../../utils/search';
import NoteModalForm from '../NoteModal';
import FormAddUpdate from '../NoteModal/NoteModal';
import Notes from './Notes';
import style from './NotesBody.module.scss';

const NotesList: React.FC = () => {
  const [isOpenForm, setIsOpenForm] = useState<boolean>(false);
  const [notes, setNotes] = useState<DataNotes>();
  const [stateOfStore, setStateOfStore] = useState<RootState>(store.getState());

  store.subscribe(() => {
    setStateOfStore(store.getState());
  });

  const {dataNotesArray} = stateOfStore.dataNotesArray;
  const {searchValueState} = stateOfStore.searchValueState;

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
      <NoteModalForm />
    </>
  );
};

export default NotesList;
