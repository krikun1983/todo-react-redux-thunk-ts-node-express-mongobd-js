import {Dispatch} from 'redux';
import {DataCategory} from 'ReduxStore/reducers/categoryState';
import {toggleErrorAction} from 'ReduxStore/reducers/errorState';
import {toggleLoaderAction} from 'ReduxStore/reducers/loaderState';
import {
  addTask,
  addTasksDefault,
  clearTasksOutput,
  DataTask,
  DataTaskBD,
  makeTaskChecked,
  updateTask,
} from 'ReduxStore/reducers/taskState';
import {
  API_TASKS,
  API_TASKS_CREATE,
  API_TASKS_DELETE,
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
        const ids = json.map((task: DataTask) => task.id);
        const tasks = {} as {[key: string]: DataTask};
        json.forEach((task: DataTask) => {
          tasks[task.id] = {...task};
        });
        return {ids, isShowTasksDone: true, tasks};
      })
      .then(json => dispatch(addTasksDefault(json)))
      .catch(error => console.error(error.message));

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
      .then(response => {
        if (response.status === 400) {
          dispatch(
            toggleErrorAction({
              isErrorState: true,
              messageError: 'Parent category does not exist!',
            }),
          );
        } else {
          return response.json();
        }
      })
      .then(json => dispatch(addTask(json)))
      .catch(error => console.error(error.message));

    dispatch(toggleLoaderAction(false));
  };

export const makeTaskAction =
  (token: string, task: DataTask) =>
  (dispatch: Dispatch): void => {
    dispatch(toggleLoaderAction(true));

    fetch(`${API_TASKS_MAKE}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(task),
    })
      .then(response => {
        if (response.status === 400) {
          dispatch(
            toggleErrorAction({
              isErrorState: true,
              messageError: 'Parent category does not exist!',
            }),
          );
        } else {
          return response.json();
        }
      })
      .then(json => dispatch(makeTaskChecked(json._id)))
      .catch(error => console.error(error.message));

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
      .then(response => {
        if (response.status === 400) {
          dispatch(
            toggleErrorAction({
              isErrorState: true,
              messageError: 'Parent category does not exist!',
            }),
          );
        } else {
          return response.json();
        }
      })
      .then(json => dispatch(updateTask(json)))
      .catch(error => console.error(error.message));

    dispatch(toggleLoaderAction(false));
  };

export const delTasksAction =
  (token: string, category: DataCategory) =>
  (dispatch: Dispatch): void => {
    dispatch(toggleLoaderAction(true));

    fetch(`${API_TASKS_DELETE}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(category),
    })
      .then(response => response.json())
      .then(json => {
        dispatch(clearTasksOutput());
        const ids = json.map((task: DataTask) => task.id);
        const tasks = {} as {[key: string]: DataTask};
        json.forEach((task: DataTask) => {
          tasks[task.id] = {...task};
        });
        return {ids, isShowTasksDone: true, tasks};
      })
      .then(obj => dispatch(addTasksDefault(obj)))
      .catch(error => console.error(error.message));

    dispatch(toggleLoaderAction(false));
  };
