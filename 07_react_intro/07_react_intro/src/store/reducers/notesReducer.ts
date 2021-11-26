import dataNotes from '../../constants/data-notes';
import {DataNotes, DataNotesAction, DataNotesActionTypes, DataNotesState} from '../types/notes';

const initialState: DataNotesState = {
  dataNotesArray: [...dataNotes],
};

const notesReducer = (state = initialState, action: DataNotesAction): DataNotesState => {
  switch (action.type) {
    case DataNotesActionTypes.ADD_NOTE:
      return {...state, dataNotesArray: [action.payload as DataNotes, ...state.dataNotesArray]};
    case DataNotesActionTypes.UPDATE_NOTE:
      return {...state, dataNotesArray: [...state.dataNotesArray, action.payload as DataNotes]};
    case DataNotesActionTypes.DELETE_NOTE:
      return {...state, dataNotesArray: [...(action.payload as DataNotes[])]};
    default:
      return state;
  }
};

export default notesReducer;
