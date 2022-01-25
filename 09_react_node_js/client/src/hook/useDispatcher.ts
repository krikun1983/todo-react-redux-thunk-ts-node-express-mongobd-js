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
  isDoneTaskAction,
  isShowDoneTasksAction,
} from 'ReduxStore/reducers/taskState';

interface DispatchMemo {
  setDoneTaskAction: (id: string) => void;
  setAddDefaultTasksAction: (token: string) => void;
  setAddTaskAction: (task: DataTask) => void;
  setUpdateTaskAction: (task: DataTask) => void;
  setShowDoneTasksAction: (isShowTasksDone: boolean) => void;
  setAddDefaultCategoryAction: (token: string) => void;
  setAddCategoryAction: (accessToken: string, category: DataCategoryBD) => void;
  setAddChildAction: (category: DataCategory) => void;
  setUpdateCategoryAction: (category: DataCategory) => void;
  setDelCategoryAction: (category: DataCategory) => void;
}

const useDispatcher = (): DispatchMemo => {
  const dispatch = useDispatch();

  return useMemo(
    () => ({
      setDoneTaskAction: (id: string) => dispatch(isDoneTaskAction(id)),
      setAddDefaultTasksAction: (token: string) =>
        dispatch(addTaskDefaultAction(token)),
      setAddTaskAction: (task: DataTask) => dispatch(addTaskAction(task)),
      setUpdateTaskAction: (task: DataTask) => dispatch(updateTaskAction(task)),
      setShowDoneTasksAction: (isShowTasksDone: boolean) =>
        dispatch(isShowDoneTasksAction(isShowTasksDone)),
      setAddDefaultCategoryAction: (token: string) =>
        dispatch(addDefaultCategoryAction(token)),
      setAddCategoryAction: (accessToken: string, category: DataCategoryBD) =>
        dispatch(addCategoryAction(accessToken, category)),
      setAddChildAction: (category: DataCategory) =>
        dispatch(addChildAction(category)),
      setUpdateCategoryAction: (category: DataCategory) =>
        dispatch(updateCategoryAction(category)),
      setDelCategoryAction: (category: DataCategory) =>
        dispatch(delCategoryAction(category)),
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
