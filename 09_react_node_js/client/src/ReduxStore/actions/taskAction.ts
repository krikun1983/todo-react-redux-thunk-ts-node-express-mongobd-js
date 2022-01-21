import {Dispatch} from 'redux';
import {ASYNC_TIME} from './constants/asyncTime';
import {toggleLoaderAction} from 'ReduxStore/reducers/loaderState';
import {
  addTask,
  addTasksDefault,
  DataTask,
  updateTask,
} from 'ReduxStore/reducers/taskState';

export const addTaskDefaultAction =
  (token: string) =>
  (dispatch: Dispatch): void => {
    dispatch(toggleLoaderAction(true));

    fetch('http://localhost:5000/api/tasks', {
      headers: {Authorization: `Bearer ${token}`},
    })
      .then(response => response.json())
      .then(json => dispatch(addTasksDefault(json)));

    dispatch(toggleLoaderAction(false));
  };

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
