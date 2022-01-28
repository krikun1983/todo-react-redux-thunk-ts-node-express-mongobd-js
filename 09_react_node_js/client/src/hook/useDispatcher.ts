import {useMemo} from 'react';
import {useDispatch} from 'react-redux';
import {
  addDefaultCategoryAction,
  addCategoryAction,
  addCategoryChildAction,
  updateCategoryAction,
  delCategoryAction,
} from 'ReduxStore/actions/categoryAction';
import {
  addTaskDefaultAction,
  addTaskAction,
  updateTaskAction,
  makeTaskAction,
  delTasksAction,
} from 'ReduxStore/actions/taskAction';
import {DataCategory, DataCategoryBD} from 'ReduxStore/reducers/categoryState';
import {
  DataTask,
  DataTaskBD,
  isShowDoneTasksAction,
} from 'ReduxStore/reducers/taskState';

interface DispatchMemo {
  setAddDefaultCategoryAction: (token: string) => void;
  setAddCategoryAction: (accessToken: string, category: DataCategoryBD) => void;
  setAddCategoryChildAction: (
    accessToken: string,
    category: DataCategoryBD,
  ) => void;
  setUpdateCategoryAction: (
    accessToken: string,
    category: DataCategory,
  ) => void;
  setDelCategoryAction: (accessToken: string, category: DataCategory) => void;
  setAddDefaultTasksAction: (token: string) => void;
  setAddTaskAction: (token: string, task: DataTaskBD) => void;
  setUpdateTaskAction: (token: string, task: DataTask) => void;
  setMakeTaskAction: (token: string, task: DataTask) => void;
  setDelTasksAction: (accessToken: string, category: DataCategory) => void;
  setShowDoneTasksAction: (isShowTasksDone: boolean) => void;
}

const useDispatcher = (): DispatchMemo => {
  const dispatch = useDispatch();

  return useMemo(
    () => ({
      setAddDefaultCategoryAction: (token: string) =>
        dispatch(addDefaultCategoryAction(token)),
      setAddCategoryAction: (accessToken: string, category: DataCategoryBD) =>
        dispatch(addCategoryAction(accessToken, category)),
      setAddCategoryChildAction: (
        accessToken: string,
        category: DataCategoryBD,
      ) => dispatch(addCategoryChildAction(accessToken, category)),
      setUpdateCategoryAction: (accessToken: string, category: DataCategory) =>
        dispatch(updateCategoryAction(accessToken, category)),
      setDelCategoryAction: (accessToken: string, category: DataCategory) =>
        dispatch(delCategoryAction(accessToken, category)),
      setAddDefaultTasksAction: (token: string) =>
        dispatch(addTaskDefaultAction(token)),
      setAddTaskAction: (token: string, task: DataTaskBD) =>
        dispatch(addTaskAction(token, task)),
      setUpdateTaskAction: (token: string, task: DataTask) =>
        dispatch(updateTaskAction(token, task)),
      setMakeTaskAction: (token: string, task: DataTask) =>
        dispatch(makeTaskAction(token, task)),
      setShowDoneTasksAction: (isShowTasksDone: boolean) =>
        dispatch(isShowDoneTasksAction(isShowTasksDone)),
      setDelTasksAction: (accessToken: string, category: DataCategory) =>
        dispatch(delTasksAction(accessToken, category)),
    }),
    [
      addDefaultCategoryAction,
      addCategoryAction,
      addCategoryChildAction,
      updateCategoryAction,
      delCategoryAction,
      addTaskDefaultAction,
      addTaskAction,
      makeTaskAction,
      updateTaskAction,
      delTasksAction,
      isShowDoneTasksAction,
    ],
  );
};

export default useDispatcher;
