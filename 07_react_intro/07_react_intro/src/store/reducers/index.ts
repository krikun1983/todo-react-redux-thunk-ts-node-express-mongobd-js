import { combineReducers } from 'redux';
import notesReducer from './notesReducer';

const rootReducer = combineReducers({
  dataNotesArray: notesReducer,
});

export default rootReducer;
