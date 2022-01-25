import {Dispatch} from 'redux';
import {ASYNC_TIME} from './constants/asyncTime';
import {toggleLoaderAction} from 'ReduxStore/reducers/loaderState';
import {
  addTask,
  addTasksDefault,
  DataTask,
  updateTask,
} from 'ReduxStore/reducers/taskState';
import {BASE_URL} from './constants/base_URL';

// "ids": [1, 2, 3, 4, 5, 6],
//   "isShowTasksDone": true,
//   "tasks": {
//     "1": {
//       "title": "Купить ноутбук",
//       "description": "Посмотреть обзор на ноутбуки",
//       "categoryId": 1,
//       "isDone": false,
//       "id": 1
//     },

export const addTaskDefaultAction =
  (token: string) =>
  (dispatch: Dispatch): void => {
    dispatch(toggleLoaderAction(true));

    fetch(`${BASE_URL}/tasks`, {
      headers: {Authorization: `Bearer ${token}`},
    })
      .then(response => response.json())
      .then(json => {
        const ids = json.map((task: DataTask) => task._id);
        const tasks = {} as {[key: string]: DataTask};
        json.forEach((task: DataTask) => {
          tasks[task._id] = {...task};
        });
        return {ids, isShowTasksDone: true, tasks};
      })
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
