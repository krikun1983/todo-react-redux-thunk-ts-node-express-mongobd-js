import {combineReducers} from 'redux';
import {categoryReducer} from './categoryState';
import {loaderReducer} from './loaderState';
import {searchReducer} from './searchReducer';
import {tasksReducer} from './taskState';

const rootReducer = combineReducers({
  dataCategoryState: categoryReducer,
  dataIdsState: categoryReducer,
  dataTaskState: tasksReducer,
  dataTaskIdsState: tasksReducer,
  dataTaskIdCurrentState: tasksReducer,
  isShowTaskOfDone: tasksReducer,
  searchTaskState: searchReducer,
  isLoaderState: loaderReducer,
});

export default rootReducer;
