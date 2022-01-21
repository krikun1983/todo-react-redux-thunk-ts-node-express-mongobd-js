import {Dispatch} from 'redux';
import {ASYNC_TIME} from './constants/asyncTime';
import {
  addCategory,
  addCategoryChild,
  addDefaultCategory,
  DataCategory,
  delCategory,
  updateCategory,
} from 'ReduxStore/reducers/categoryState';
import {toggleLoaderAction} from 'ReduxStore/reducers/loaderState';

export const addDefaultCategoryAction =
  (token: string) =>
  (dispatch: Dispatch): void => {
    dispatch(toggleLoaderAction(true));

    fetch('http://localhost:5000/api/categories', {
      headers: {Authorization: `Bearer ${token}`},
    })
      .then(response => response.json())
      .then(json => dispatch(addDefaultCategory(json)));

    dispatch(toggleLoaderAction(false));
  };

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
