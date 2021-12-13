import {Dispatch} from 'redux';
import {
  addCategory,
  addCategoryChild,
  DataCategory,
  delCategory,
  updateCategory,
} from 'ReduxStore/reducers/categoryState';
import {toggleLoaderAction} from 'ReduxStore/reducers/loaderState';

const ASYNC_TIME = 750;

export const addCategoryAction =
  (category: DataCategory) =>
  (dispatch: Dispatch): void => {
    dispatch(toggleLoaderAction(true));
    Promise.resolve().then(() => {
      setTimeout(() => {
        dispatch(addCategory(category));
        dispatch(toggleLoaderAction(false));
      }, ASYNC_TIME);
    });
  };

export const updateCategoryAction =
  (category: DataCategory) =>
  (dispatch: Dispatch): void => {
    dispatch(toggleLoaderAction(true));
    Promise.resolve().then(() => {
      setTimeout(() => {
        dispatch(updateCategory(category));
        dispatch(toggleLoaderAction(false));
      }, ASYNC_TIME);
    });
  };

export const delCategoryAction =
  (category: DataCategory) =>
  (dispatch: Dispatch): void => {
    dispatch(toggleLoaderAction(true));
    Promise.resolve().then(() => {
      setTimeout(() => {
        dispatch(delCategory(category));
        dispatch(toggleLoaderAction(false));
      }, ASYNC_TIME);
    });
  };

export const addChildAction =
  (category: DataCategory) =>
  (dispatch: Dispatch): void => {
    dispatch(toggleLoaderAction(true));
    Promise.resolve().then(() => {
      setTimeout(() => {
        dispatch(addCategoryChild(category));
        dispatch(toggleLoaderAction(false));
      }, ASYNC_TIME);
    });
  };
