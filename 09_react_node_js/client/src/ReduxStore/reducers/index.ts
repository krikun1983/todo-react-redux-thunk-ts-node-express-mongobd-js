import {combineReducers} from 'redux';
import {categoryReducer} from './categoryState';
import {errorReducer} from './errorState';
import {loaderReducer} from './loaderState';
import {tasksReducer} from './taskState';

const rootReducer = combineReducers({
  dataCategoryState: categoryReducer,
  dataIdsState: categoryReducer,
  dataTaskState: tasksReducer,
  dataTaskIdsState: tasksReducer,
  isShowTasksDone: tasksReducer,
  isLoaderState: loaderReducer,
  isErrorState: errorReducer,
  messageError: errorReducer,
});

export default rootReducer;
