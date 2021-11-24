import dataNotes from '../../constants/data-notes';
import {DataNotesAction, DataNotesActionTypes, DataNotesState} from '../types/notes';

const initialState: DataNotesState = {
  dataNotesArray: [...dataNotes],
};

const notesReducer = (state = initialState, action: DataNotesAction): DataNotesState => {
  switch (action.type) {
    case DataNotesActionTypes.ADD_NOTE:
      return {...state, dataNotesArray: [...state.dataNotesArray, action.payload]};
    case DataNotesActionTypes.UPDATE_NOTE:
      return {...state, dataNotesArray: [...state.dataNotesArray, action.payload]};
    case DataNotesActionTypes.DELETE_NOTE:
      return {...state, dataNotesArray: [...state.dataNotesArray, action.payload]};
    default:
      return state;
  }
};

export default notesReducer;
