import dataNotes from '../../constants/data-notes';
import {DataNotes, DataNotesAction, DataNotesActionTypes, DataNotesState} from '../types/notes';

const initialState: DataNotesState = {
  dataNotesArray: [...dataNotes],
};

export const notesReducer = (state = initialState, action: DataNotesAction): DataNotesState => {
  switch (action.type) {
    case DataNotesActionTypes.ADD_NOTE:
      return {...state, dataNotesArray: [action.payload as DataNotes, ...state.dataNotesArray]};
    case DataNotesActionTypes.UPDATE_NOTE:
      return {...state, dataNotesArray: [...state.dataNotesArray, action.payload as DataNotes]};
    case DataNotesActionTypes.REMOVE_NOTE:
      return {
        ...state,
        dataNotesArray: [...state.dataNotesArray.filter(note => note.id !== action.payload)],
      };
    default:
      return state;
  }
};

export const addNoteAction = (payload: DataNotes) => ({
  type: DataNotesActionTypes.ADD_NOTE,
  payload,
});

export const removeNoteAction = (payload: number) => ({
  type: DataNotesActionTypes.REMOVE_NOTE,
  payload,
});
