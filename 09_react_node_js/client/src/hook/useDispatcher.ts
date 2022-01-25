import {useMemo} from 'react';
import {useDispatch} from 'react-redux';
import {
  addCategoryAction,
  addChildAction,
  addDefaultCategoryAction,
  delCategoryAction,
  updateCategoryAction,
} from 'ReduxStore/actions/categoryAction';
import {
  addTaskAction,
  addTaskDefaultAction,
  updateTaskAction,
} from 'ReduxStore/actions/taskAction';
import {DataCategory, DataCategoryBD} from 'ReduxStore/reducers/categoryState';
import {
  DataTask,
  DataTaskBD,
  isDoneTaskAction,
  isShowDoneTasksAction,
} from 'ReduxStore/reducers/taskState';

interface DispatchMemo {
  setDoneTaskAction: (id: string) => void;
  setAddDefaultTasksAction: (token: string) => void;
  setAddTaskAction: (token: string, task: DataTaskBD) => void;
  setUpdateTaskAction: (task: DataTask) => void;
  setShowDoneTasksAction: (isShowTasksDone: boolean) => void;
  setAddDefaultCategoryAction: (token: string) => void;
  setAddCategoryAction: (accessToken: string, category: DataCategoryBD) => void;
  setAddChildAction: (accessToken: string, category: DataCategoryBD) => void;
  setUpdateCategoryAction: (
    accessToken: string,
    category: DataCategory,
  ) => void;
  setDelCategoryAction: (accessToken: string, category: DataCategory) => void;
}

const useDispatcher = (): DispatchMemo => {
  const dispatch = useDispatch();

  return useMemo(
    () => ({
      setDoneTaskAction: (id: string) => dispatch(isDoneTaskAction(id)),
      setAddDefaultTasksAction: (token: string) =>
        dispatch(addTaskDefaultAction(token)),
      setAddTaskAction: (token: string, task: DataTaskBD) =>
        dispatch(addTaskAction(token, task)),
      setUpdateTaskAction: (task: DataTask) => dispatch(updateTaskAction(task)),
      setShowDoneTasksAction: (isShowTasksDone: boolean) =>
        dispatch(isShowDoneTasksAction(isShowTasksDone)),
      setAddDefaultCategoryAction: (token: string) =>
        dispatch(addDefaultCategoryAction(token)),
      setAddCategoryAction: (accessToken: string, category: DataCategoryBD) =>
        dispatch(addCategoryAction(accessToken, category)),
      setAddChildAction: (accessToken: string, category: DataCategoryBD) =>
        dispatch(addChildAction(accessToken, category)),
      setUpdateCategoryAction: (accessToken: string, category: DataCategory) =>
        dispatch(updateCategoryAction(accessToken, category)),
      setDelCategoryAction: (accessToken: string, category: DataCategory) =>
        dispatch(delCategoryAction(accessToken, category)),
    }),
    [
      isDoneTaskAction,
      isShowDoneTasksAction,
      addChildAction,
      updateTaskAction,
      updateCategoryAction,
      addDefaultCategoryAction,
      addCategoryAction,
      addTaskAction,
      addTaskDefaultAction,
      delCategoryAction,
    ],
  );
};

export default useDispatcher;
