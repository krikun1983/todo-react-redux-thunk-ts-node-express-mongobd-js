import {Dispatch} from 'redux';
import store from 'store';
import {toggleLoaderAction} from 'store/reducers/loaderReducer';
import {addNote, removeNote, updateNote} from '../reducers/notesReducer';
import {DataNote} from '../types/notes';

export const ASYNC_TIME = 2000;

export const addNoteAction =
  (note: DataNote) =>
  (dispatch: Dispatch): void => {
    store.dispatch(toggleLoaderAction(true));
    Promise.resolve().then(() => {
      setTimeout(() => {
        dispatch(addNote(note));
        store.dispatch(toggleLoaderAction(false));
      }, ASYNC_TIME);
    });
  };
export const updateNoteAction =
  (note: DataNote) =>
  (dispatch: Dispatch): void => {
    store.dispatch(toggleLoaderAction(true));
    Promise.resolve().then(() => {
      setTimeout(() => {
        dispatch(updateNote(note));
        store.dispatch(toggleLoaderAction(false));
      }, ASYNC_TIME);
    });
  };

export const removeNoteAction =
  (id: number) =>
  (dispatch: Dispatch): void => {
    store.dispatch(toggleLoaderAction(true));
    Promise.resolve().then(() => {
      setTimeout(() => {
        dispatch(removeNote(id));
        store.dispatch(toggleLoaderAction(false));
      }, ASYNC_TIME);
    });
  };
