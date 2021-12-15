import DATA_TASKS from 'ReduxStore/data/data-tasks';

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
  dataTaskIdCurrentState: number;
}

export interface DataTaskAction {
  type: string;
  payload: DataTask | number;
}

const initialSTate: DataTaskState = {
  dataTaskState: {...DATA_TASKS.tasks},
  dataTaskIdsState: [...DATA_TASKS.ids],
  dataTaskIdCurrentState: 0,
};

export enum DataTaskActionTypes {
  ADD_TASK = 'ADD_TASK',
  SHOW_CURRENT_TASK = 'SHOW_CURRENT_TASK',
  UPDATE_IS_DONE_TASK = 'UPDATE_IS_DONE_TASK',
  UPDATE_TASK = 'UPDATE_TASK',
  REMOVE_TASK = 'REMOVE_TASK',
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
        dataTaskIdCurrentState: (action.payload as DataTask).categoryId,
      };
    case DataTaskActionTypes.SHOW_CURRENT_TASK:
      return {
        ...state,
        dataTaskIdCurrentState: action.payload as number,
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
    default:
      return state;
  }
};

export const addTask = (payload: DataTask): DataTaskAction => ({
  type: DataTaskActionTypes.ADD_TASK,
  payload,
});

export const showTaskAction = (payload: number): DataTaskAction => ({
  type: DataTaskActionTypes.SHOW_CURRENT_TASK,
  payload,
});

export const isDoneTaskAction = (payload: number): DataTaskAction => ({
  type: DataTaskActionTypes.UPDATE_IS_DONE_TASK,
  payload,
});
