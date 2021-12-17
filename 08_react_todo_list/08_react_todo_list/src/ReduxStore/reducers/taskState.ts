import DATA_TASKS from '../data/data-tasks.json';

export interface DataTask {
  title: string;
  description: string;
  categoryId: number;
  isDone: boolean;
  id: number;
}

export interface DataTaskState {
  dataTaskState: {[key: number]: DataTask};
  dataTaskIdsState: number[];
  isShowTasksDone: boolean;
}

export interface DataTaskAction {
  type: string;
  payload: DataTask | number | boolean;
}

const initialSTate: DataTaskState = {
  dataTaskState: {...DATA_TASKS.tasks},
  dataTaskIdsState: [...DATA_TASKS.ids],
  isShowTasksDone: DATA_TASKS.isShowTasksDone,
};

export enum DataTaskActionTypes {
  ADD_TASK = 'ADD_TASK',
  SHOW_DONE_TASKS = 'SHOW_DONE_TASKS',
  UPDATE_IS_DONE_TASK = 'UPDATE_IS_DONE_TASK',
  UPDATE_TASK = 'UPDATE_TASK',
}

export const tasksReducer = (
  state = initialSTate,
  action: DataTaskAction,
): DataTaskState => {
  switch (action.type) {
    case DataTaskActionTypes.ADD_TASK:
      return {
        ...state,
        dataTaskIdsState: [
          (action.payload as DataTask).id,
          ...state.dataTaskIdsState,
        ],
        dataTaskState: {
          ...state.dataTaskState,
          [(action.payload as DataTask).id]: action.payload as DataTask,
        },
      };
    case DataTaskActionTypes.SHOW_DONE_TASKS:
      return {
        ...state,
        isShowTasksDone: !action.payload as boolean,
      };
    case DataTaskActionTypes.UPDATE_IS_DONE_TASK:
      return {
        ...state,
        dataTaskState: {
          ...state.dataTaskState,
          [action.payload as number]: {
            ...state.dataTaskState[action.payload as number],
            isDone: !state.dataTaskState[action.payload as number].isDone,
          },
        },
      };
    case DataTaskActionTypes.UPDATE_TASK:
      return {
        ...state,
        dataTaskState: {
          ...state.dataTaskState,
          [(action.payload as DataTask).id]: {
            ...(action.payload as DataTask),
          },
        },
      };
    default:
      return state;
  }
};

export const addTask = (payload: DataTask): DataTaskAction => ({
  type: DataTaskActionTypes.ADD_TASK,
  payload,
});

export const isShowDoneTasksAction = (payload: boolean): DataTaskAction => ({
  type: DataTaskActionTypes.SHOW_DONE_TASKS,
  payload,
});

export const isDoneTaskAction = (payload: number): DataTaskAction => ({
  type: DataTaskActionTypes.UPDATE_IS_DONE_TASK,
  payload,
});

export const updateTask = (payload: DataTask): DataTaskAction => ({
  type: DataTaskActionTypes.UPDATE_TASK,
  payload,
});
