import {Dispatch} from 'redux';
import {toggleLoaderAction} from 'ReduxStore/reducers/loaderState';
import {
  addTask,
  addTasksDefault,
  DataTask,
  DataTaskBD,
  isDoneTask,
  updateTask,
} from 'ReduxStore/reducers/taskState';
import {BASE_URL} from './constants/base_URL';

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
  (token: string, task: DataTaskBD) =>
  (dispatch: Dispatch): void => {
    dispatch(toggleLoaderAction(true));

    fetch(`${BASE_URL}/tasks/create`, {
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

export const isDoneTaskAction =
  (token: string, id: string) =>
  (dispatch: Dispatch): void => {
    dispatch(toggleLoaderAction(true));

    fetch(`${BASE_URL}/tasks/isDone`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({_id: id}),
    })
      .then(response => response.json())
      .then(json => dispatch(isDoneTask(json._id)));

    dispatch(toggleLoaderAction(false));
  };

export const updateTaskAction =
  (token: string, task: DataTask) =>
  (dispatch: Dispatch): void => {
    dispatch(toggleLoaderAction(true));

    fetch(`${BASE_URL}/tasks/update`, {
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
