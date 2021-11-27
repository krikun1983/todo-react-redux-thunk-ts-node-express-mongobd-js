import {Dispatch} from 'redux';
import {addNoteAction, removeNoteAction} from '../reducers/notesReducer';
import {DataNote} from '../types/notes';

export const ASYNC_TIME = 3000;

export const addNoteActionAsync = (note: DataNote) => {
  return (dispatch: Dispatch): void => {
    Promise.resolve().then(() => {
      setTimeout(() => dispatch(addNoteAction(note)), ASYNC_TIME);
    });
  };
};

export const removeNoteActionAsync = (id: number) => {
  return (dispatch: Dispatch): void => {
    Promise.resolve().then(() => {
      setTimeout(() => dispatch(removeNoteAction(id)), ASYNC_TIME);
    });
  };
};
