import {Dispatch} from 'redux';
import {toggleLoaderAction} from 'ReduxStore/reducers/loaderState';
import {
  addTask,
  addTasksDefault,
  DataTask,
  DataTaskBD,
  makeTaskChecked,
  updateTask,
} from 'ReduxStore/reducers/taskState';
import {
  API_TASKS,
  API_TASKS_CREATE,
  API_TASKS_MAKE,
  API_TASKS_UPDATE,
} from './constants/api';

export const addTaskDefaultAction =
  (token: string) =>
  (dispatch: Dispatch): void => {
    dispatch(toggleLoaderAction(true));

    fetch(`${API_TASKS}`, {
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
  (token: string, task: DataTaskBD) =>
  (dispatch: Dispatch): void => {
    dispatch(toggleLoaderAction(true));

    fetch(`${API_TASKS_CREATE}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(task),
    })
      .then(response => response.json())
      .then(json => dispatch(addTask(json)));

    dispatch(toggleLoaderAction(false));
  };

export const makeTaskAction =
  (token: string, id: string) =>
  (dispatch: Dispatch): void => {
    dispatch(toggleLoaderAction(true));

    fetch(`${API_TASKS_MAKE}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({_id: id}),
    })
      .then(response => response.json())
      .then(json => dispatch(makeTaskChecked(json._id)));

    dispatch(toggleLoaderAction(false));
  };

export const updateTaskAction =
  (token: string, task: DataTask) =>
  (dispatch: Dispatch): void => {
    dispatch(toggleLoaderAction(true));

    fetch(`${API_TASKS_UPDATE}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(task),
    })
      .then(response => response.json())
      .then(json => dispatch(updateTask(json)));

    dispatch(toggleLoaderAction(false));
  };
