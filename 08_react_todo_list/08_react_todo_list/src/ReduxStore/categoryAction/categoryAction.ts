import {Dispatch} from 'redux';
import {addCategory, DataCategory} from 'ReduxStore/reducers/categoryState';
import {toggleLoaderAction} from 'ReduxStore/reducers/loaderState';

const ASYNC_TIME = 1000;

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
