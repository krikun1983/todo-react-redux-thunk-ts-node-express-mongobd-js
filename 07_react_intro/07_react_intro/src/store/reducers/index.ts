import {combineReducers} from 'redux';
import {notesReducer} from './notesReducer';
import {searchReducer} from './searchReducer';

const rootReducer = combineReducers({
  dataNotesState: notesReducer,
  searchNoteState: searchReducer,
});

export default rootReducer;
