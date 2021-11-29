import {Dispatch} from 'redux';
import store from 'store';
import {toggleLoaderAction} from 'store/reducers/loaderReducer';

import {addNoteAction, removeNoteAction, updateNoteAction} from '../reducers/notesReducer';
import {DataNote} from '../types/notes';

export const ASYNC_TIME = 2000;

export const addNoteActionAsync = (note: DataNote) => {
  return (dispatch: Dispatch): void => {
    store.dispatch(toggleLoaderAction(true));
    Promise.resolve().then(() => {
      setTimeout(() => {
        dispatch(addNoteAction(note));
        store.dispatch(toggleLoaderAction(false));
      }, ASYNC_TIME);
    });
  };
};

export const updateNoteActionAsync = (notes: DataNote[]) => {
  return (dispatch: Dispatch): void => {
    store.dispatch(toggleLoaderAction(true));
    Promise.resolve().then(() => {
      setTimeout(() => {
        dispatch(updateNoteAction(notes));
        store.dispatch(toggleLoaderAction(false));
      }, ASYNC_TIME);
    });
  };
};

export const removeNoteActionAsync = (id: number) => {
  return (dispatch: Dispatch): void => {
    store.dispatch(toggleLoaderAction(true));
    Promise.resolve().then(() => {
      setTimeout(() => {
        dispatch(removeNoteAction(id));
        store.dispatch(toggleLoaderAction(false));
      }, ASYNC_TIME);
    });
  };
};
