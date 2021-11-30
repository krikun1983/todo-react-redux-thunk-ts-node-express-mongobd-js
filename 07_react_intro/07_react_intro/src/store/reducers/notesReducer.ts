import DATA_NOTES from 'constants/dataNotes';
import {DataNote, DataNotesAction, DataNotesActionTypes, DataNotesState} from '../types/notes';

const initialState: DataNotesState = {
  dataNotesState: [...DATA_NOTES],
};

export const notesReducer = (state = initialState, action: DataNotesAction): DataNotesState => {
  switch (action.type) {
    case DataNotesActionTypes.ADD_NOTE:
      return {...state, dataNotesState: [action.payload as DataNote, ...state.dataNotesState]};
    case DataNotesActionTypes.UPDATE_NOTE:
      return {...state, dataNotesState: [...(action.payload as DataNote[])]};
    case DataNotesActionTypes.REMOVE_NOTE:
      return {
        ...state,
        dataNotesState: [...state.dataNotesState.filter(note => note.id !== action.payload)],
      };
    default:
      return state;
  }
};

export const addNote = (payload: DataNote): DataNotesAction => ({
  type: DataNotesActionTypes.ADD_NOTE,
  payload,
});

export const updateNote = (payload: DataNote[]): DataNotesAction => ({
  type: DataNotesActionTypes.UPDATE_NOTE,
  payload,
});

export const removeNote = (payload: number): DataNotesAction => ({
  type: DataNotesActionTypes.REMOVE_NOTE,
  payload,
});
