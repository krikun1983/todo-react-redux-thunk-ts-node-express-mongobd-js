import React, {FormEvent, MouseEvent, useState} from 'react';
import {useDispatch} from 'react-redux';
import store from 'store';
import {removeNoteActionAsync, updateNoteActionAsync} from 'store/asyncActions/noteActionAsync';
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
  const [noteCurrent, setNoteCurrent] = useState<DataNote>();
  const [isOpenForm, setIsOpenForm] = useState<boolean>(false);
  const [isOpenFormDeleteNote, setIsOpenFormDeleteNote] = useState<boolean>(false);
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
    dispatch(removeNoteActionAsync(noteIdDelete));
    handleCloseFormDeleteNote();
  };

  const changeNote = (
    arr: DataNote[],
    id: number,
    title: string,
    description: string,
    bgColor: string,
    color: string,
  ): DataNote[] => {
    const idx = arr.findIndex(item => item.id === id);
    const newItem = {...arr[idx]};
    newItem.title = title;
    newItem.description = description;
    newItem.bgColor = bgColor;
    newItem.color = color;
    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
  };

  const handleSubmit = (
    e: FormEvent<HTMLFormElement>,
    title: string,
    description: string,
    bgColor: string,
    color: string,
  ) => {
    e.preventDefault();
    const dataNotesUpdate = changeNote(
      dataNotesState,
      noteCurrent?.id as number,
      title,
      description,
      bgColor,
      color,
    );
    dispatch(updateNoteActionAsync(dataNotesUpdate));
    handleCloseForm();
  };

  return (
    <>
      <ul className={style.notes_group}>
        {searchValue.map(item => {
          const {id, color, bgColor, ...rest} = item;
          return (
            <li
              className={style.notes_group__item}
              style={{backgroundColor: bgColor, color: color}}
              onClick={() => handleOpenForm(item)}
              key={id}
            >
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
          onIsOpenFormDeleteNote={setIsOpenFormDeleteNote}
        />
      )}
      {isOpenForm && (
        <NoteModal
          isOpenForm={isOpenForm}
          onCloseForm={handleCloseForm}
          onSubmitForm={handleSubmit}
          note={noteCurrent}
          onIsOpenForm={setIsOpenForm}
        />
      )}
      <NoteModalForm />
    </>
  );
};

export default NotesList;
