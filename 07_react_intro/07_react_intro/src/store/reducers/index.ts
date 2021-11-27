import {combineReducers} from 'redux';
import {loaderReducer} from './loaderReducer';
import {notesReducer} from './notesReducer';
import {searchReducer} from './searchReducer';

const rootReducer = combineReducers({
  dataNotesState: notesReducer,
  searchNoteState: searchReducer,
  isLoaderState: loaderReducer,
});

export default rootReducer;
