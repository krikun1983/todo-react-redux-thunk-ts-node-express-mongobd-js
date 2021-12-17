import {Dispatch} from 'redux';
import {ASYNC_TIME} from './constants/asyncTime';
import {toggleLoaderAction} from 'ReduxStore/reducers/loaderState';
import {addTask, DataTask, updateTask} from 'ReduxStore/reducers/taskState';

export const addTaskAction =
  (task: DataTask) =>
  (dispatch: Dispatch): void => {
    dispatch(toggleLoaderAction(true));
    Promise.resolve().then(() => {
      setTimeout(() => {
        dispatch(addTask(task));
        dispatch(toggleLoaderAction(false));
      }, ASYNC_TIME);
    });
  };

export const updateTaskAction =
  (task: DataTask) =>
  (dispatch: Dispatch): void => {
    dispatch(toggleLoaderAction(true));
    Promise.resolve().then(() => {
      setTimeout(() => {
        dispatch(updateTask(task));
        dispatch(toggleLoaderAction(false));
      }, ASYNC_TIME);
    });
  };
