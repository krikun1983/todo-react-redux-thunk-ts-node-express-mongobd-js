import React, {FormEvent, MouseEvent, useState} from 'react';
import {useDispatch} from 'react-redux';
import store from '../../../store';
import {DataNotes, DataNotesActionTypes} from '../../../store/types/notes';
import {RootState} from '../../../store/types/root-state';
import {search} from '../../../utils/search';
import ConfirmModal from '../ConfirmModal';
import NoteModalForm from '../NoteModal';
import NoteModal from '../NoteModal/NoteModal';
import Notes from './Notes';
import style from './NotesBody.module.scss';

const NotesList: React.FC = () => {
  const dispatch = useDispatch();
  const [stateOfStore, setStateOfStore] = useState<RootState>(store.getState());
  const [notes, setNotes] = useState<DataNotes>();
  const [isOpenForm, setIsOpenForm] = useState<boolean>(false);
  const [isOpenFormDeleteNote, setIsOpenFormDeleteNote] = useState<boolean>(false);
  const [noteIdDelete, setNoteIdDelete] = useState<number>();

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

  const handleOpenFormDeleteNote = (e: MouseEvent<HTMLButtonElement>, id: number) => {
    e.stopPropagation();
    setIsOpenFormDeleteNote(true);
    setNoteIdDelete(id);
  };

  const handleCloseFormDeleteNote = () => {
    setIsOpenFormDeleteNote(false);
  };

  const handleDeleteNote = () => {
    const state = dataNotesArray.filter(note => note.id !== noteIdDelete);
    dispatch({type: DataNotesActionTypes.DELETE_NOTE, payload: state});
    handleCloseFormDeleteNote();
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
              <Notes {...rest} onOpenFormDeleteNote={e => handleOpenFormDeleteNote(e, id)} />
            </li>
          );
        })}
      </ul>
      {isOpenFormDeleteNote && (
        <ConfirmModal
          isOpenFormDeleteNote={isOpenFormDeleteNote}
          onDeleteNote={handleDeleteNote}
          onCloseForm={handleCloseFormDeleteNote}
        />
      )}
      {isOpenForm && (
        <NoteModal
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
