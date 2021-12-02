import React, {FormEvent, MouseEvent, useState} from 'react';
import {useDispatch} from 'react-redux';
import store from 'store';
import {
  removeNoteAction,
  updateNoteAction,
} from 'store/noteActions/noteActions';
import {DataNote} from 'store/types/notes';
import {RootState} from 'store/types/rootState';
import {search} from 'utils/search';
import ConfirmModal from '../ConfirmModal';
import NoteModalForm from '../NoteModalForm';
import NoteModal from '../NoteModalForm/NoteModal';
import Notes from './Notes';
import style from './NotesList.module.scss';

const NotesList: React.FC = () => {
  const dispatch = useDispatch();
  const [stateOfStore, setStateOfStore] = useState<RootState>(store.getState());
  const [noteCurrent, setNoteCurrent] = useState<DataNote | null>(null);
  const [isOpenForm, setIsOpenForm] = useState<boolean>(false);
  const [isOpenFormDeleteNote, setIsOpenFormDeleteNote] =
    useState<boolean>(false);
  const [noteIdDelete, setNoteIdDelete] = useState<number>(0);

  store.subscribe(() => {
    setStateOfStore(store.getState());
  });

  const {dataNotesState} = stateOfStore.dataNotesState;
  const {searchNoteState} = stateOfStore.searchNoteState;

  const searchValue = search(dataNotesState, searchNoteState);

  const handleOpenForm = (note: DataNote) => {
    setIsOpenForm(true);
    setNoteCurrent(note);
  };

  const handleCloseForm = () => {
    setIsOpenForm(false);
    setNoteCurrent(null);
  };

  const handleOpenFormDeleteNote = (
    e: MouseEvent<HTMLButtonElement>,
    id: number,
  ) => {
    e.stopPropagation();
    setIsOpenFormDeleteNote(true);
    setNoteIdDelete(id);
  };

  const handleCloseFormDeleteNote = () => {
    setIsOpenFormDeleteNote(false);
  };

  const handleDeleteNote = () => {
    dispatch(removeNoteAction(noteIdDelete));
    handleCloseFormDeleteNote();
  };

  const handleSubmit = (
    e: FormEvent<HTMLFormElement>,
    title: string,
    description: string,
    bgColor: string,
    color: string,
  ) => {
    e.preventDefault();
    dispatch(
      updateNoteAction({
        title,
        description,
        bgColor,
        color,
        id: noteCurrent?.id as number,
      }),
    );
    handleCloseForm();
  };

  return (
    <>
      <ul className={style.notes_group}>
        {searchValue.map((note: DataNote) => {
          const {id, color, bgColor, ...rest} = note;
          return (
            <li
              className={style.notes_group__item}
              style={{backgroundColor: bgColor, color: color}}
              onClick={() => handleOpenForm(note)}
              key={id}
            >
              <Notes
                {...rest}
                onOpenFormDeleteNote={(e: MouseEvent<HTMLButtonElement>) =>
                  handleOpenFormDeleteNote(e, id)
                }
              />
            </li>
          );
        })}
      </ul>
      {isOpenFormDeleteNote && (
        <ConfirmModal
          isOpenFormDeleteNote={isOpenFormDeleteNote}
          onDeleteNote={handleDeleteNote}
          onCloseForm={handleCloseFormDeleteNote}
          onIsOpenFormDeleteNote={setIsOpenFormDeleteNote}
        />
      )}
      {isOpenForm && (
        <NoteModal
          isOpenForm={isOpenForm}
          onCloseForm={handleCloseForm}
          onSubmitForm={handleSubmit}
          note={noteCurrent}
        />
      )}
      <NoteModalForm />
    </>
  );
};

export default NotesList;
