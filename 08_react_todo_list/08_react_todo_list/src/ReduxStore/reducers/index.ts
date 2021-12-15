import {combineReducers} from 'redux';
import {categoryReducer} from './categoryState';
import {loaderReducer} from './loaderState';
import {tasksReducer} from './taskState';

const rootReducer = combineReducers({
  dataCategoryState: categoryReducer,
  dataIdsState: categoryReducer,
  dataTaskState: tasksReducer,
  dataTaskIdsState: tasksReducer,
  dataTaskIdCurrentState: tasksReducer,
  isShowTaskOfDone: tasksReducer,
  isLoaderState: loaderReducer,
});

export default rootReducer;
