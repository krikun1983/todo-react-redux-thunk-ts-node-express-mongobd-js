import DATA_TASKS from 'ReduxStore/data/data-tasks';

export interface DataTask {
  title: string;
  description: string;
  categoryId: number;
  id: number;
}

export interface DataTaskState {
  dataTaskState: DataTask[];
}

export interface DataTaskAction {
  type: string;
  payload: DataTask;
}

const initialSTate: DataTaskState = {
  dataTaskState: [...DATA_TASKS],
};

export enum DataTaskActionTypes {
  ADD_TASK = 'ADD_TASK',
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
        dataTaskState: [action.payload as DataTask, ...state.dataTaskState],
      };
    default:
      return state;
  }
};
