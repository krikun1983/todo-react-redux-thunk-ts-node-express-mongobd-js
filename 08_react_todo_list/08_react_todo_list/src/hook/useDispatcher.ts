import {useMemo} from 'react';
import {useDispatch} from 'react-redux';
import {
  addCategoryAction,
  addChildAction,
  delCategoryAction,
  updateCategoryAction,
} from 'ReduxStore/actions/categoryAction';
import {addTaskAction, updateTaskAction} from 'ReduxStore/actions/taskAction';
import {DataCategory} from 'ReduxStore/reducers/categoryState';
import {
  DataTask,
  isDoneTaskAction,
  isShowDoneTasksAction,
} from 'ReduxStore/reducers/taskState';

interface DispatchMemo {
  setDoneTaskAction: (id: number) => void;
  setAddTaskAction: (task: DataTask) => void;
  setUpdateTaskAction: (task: DataTask) => void;
  setShowDoneTasksAction: (isShowTasksDone: boolean) => void;
  setAddCategoryAction: (category: DataCategory) => void;
  setAddChildAction: (category: DataCategory) => void;
  setUpdateCategoryAction: (category: DataCategory) => void;
  setDelCategoryAction: (category: DataCategory) => void;
}

const useDispatcher = (): DispatchMemo => {
  const dispatch = useDispatch();

  return useMemo(
    () => ({
      setDoneTaskAction: (id: number) => dispatch(isDoneTaskAction(id)),
      setAddTaskAction: (task: DataTask) => dispatch(addTaskAction(task)),
      setUpdateTaskAction: (task: DataTask) => dispatch(updateTaskAction(task)),
      setShowDoneTasksAction: (isShowTasksDone: boolean) =>
        dispatch(isShowDoneTasksAction(isShowTasksDone)),
      setAddCategoryAction: (category: DataCategory) =>
        dispatch(addCategoryAction(category)),
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
      addCategoryAction,
      addTaskAction,
      delCategoryAction,
    ],
  );
};

export default useDispatcher;
