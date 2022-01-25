import {Dispatch} from 'redux';
import {
  addCategory,
  addCategoryChild,
  addDefaultCategory,
  DataCategory,
  DataCategoryBD,
  delCategory,
  updateCategory,
} from 'ReduxStore/reducers/categoryState';
import {toggleLoaderAction} from 'ReduxStore/reducers/loaderState';
import {BASE_URL} from './constants/base_URL';

export const addDefaultCategoryAction =
  (token: string) =>
  (dispatch: Dispatch): void => {
    dispatch(toggleLoaderAction(true));

    fetch(`${BASE_URL}/categories`, {
      headers: {Authorization: `Bearer ${token}`},
    })
      .then(response => response.json())
      .then(json => {
        const ids = json.map((category: DataCategory) => category._id);
        const dataCategories = {} as {[key: string]: DataCategory};
        json.forEach((category: DataCategory) => {
          dataCategories[category._id] = {...category};
        });
        return {ids, dataCategories};
      })
      .then(categories => dispatch(addDefaultCategory(categories)));

    dispatch(toggleLoaderAction(false));
  };

export const addCategoryAction =
  (token: string, category: DataCategoryBD) =>
  (dispatch: Dispatch): void => {
    dispatch(toggleLoaderAction(true));

    fetch(`${BASE_URL}/categories/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(category),
    })
      .then(response => response.json())
      .then(json => dispatch(addCategory({...category, _id: json._id})));

    dispatch(toggleLoaderAction(false));
  };

export const updateCategoryAction =
  (token: string, category: DataCategory) =>
  (dispatch: Dispatch): void => {
    dispatch(toggleLoaderAction(true));

    fetch(`${BASE_URL}/categories/update`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(category),
    })
      .then(response => response.json())
      .then(json => dispatch(updateCategory(json)));

    dispatch(toggleLoaderAction(false));
  };

export const delCategoryAction =
  (token: string, category: DataCategory) =>
  (dispatch: Dispatch): void => {
    dispatch(toggleLoaderAction(true));

    fetch(`${BASE_URL}/categories/delete`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(category),
    })
      .then(response => response.json())
      .then(json => dispatch(delCategory(json)));

    dispatch(toggleLoaderAction(false));
  };

export const addChildAction =
  (token: string, category: DataCategoryBD) =>
  (dispatch: Dispatch): void => {
    dispatch(toggleLoaderAction(true));

    fetch(`${BASE_URL}/categories/create/child`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(category),
    })
      .then(response => response.json())
      .then(json => {
        dispatch(addCategoryChild({...category, _id: json._id}));
      });

    dispatch(toggleLoaderAction(false));
  };
