import {combineReducers} from 'redux';
import {categoryReducer} from './categoryState';
import {tasksReducer} from './taskState';

const rootReducer = combineReducers({
  dataCategoryState: categoryReducer,
  dataIdsState: categoryReducer,
  dataTaskState: tasksReducer,
});

export default rootReducer;
