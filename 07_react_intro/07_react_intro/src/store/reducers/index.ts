import {combineReducers} from 'redux';
import {notesReducer} from './notesReducer';
import {searchReducer} from './searchValueReducer';

const rootReducer = combineReducers({
  dataNotesArray: notesReducer,
  searchValueState: searchReducer,
});

export default rootReducer;
