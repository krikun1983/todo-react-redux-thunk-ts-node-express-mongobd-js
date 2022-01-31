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
import {toggleErrorAction} from 'ReduxStore/reducers/errorState';
import {toggleLoaderAction} from 'ReduxStore/reducers/loaderState';
import {
  API_CATEGORIES,
  API_CATEGORIES_CREATE,
  API_CATEGORIES_CREATE_CHILD,
  API_CATEGORIES_UPDATE,
  API_CATEGORIES_DELETE,
} from './constants/api';

export const addDefaultCategoryAction =
  (token: string) =>
  async (dispatch: Dispatch): Promise<void> => {
    dispatch(toggleLoaderAction(true));

    await fetch(`${API_CATEGORIES}`, {
      headers: {Authorization: `Bearer ${token}`},
    })
      .then(response => response.json())
      .then(json => {
        const ids = json.map((category: DataCategory) => category.id);
        const dataCategories = {} as {[key: string]: DataCategory};
        json.forEach((category: DataCategory) => {
          dataCategories[category.id] = {...category};
        });
        return {ids, dataCategories};
      })
      .then(categories => dispatch(addDefaultCategory(categories)))
      .catch(error => console.log(error.message));

    dispatch(toggleLoaderAction(false));
  };

export const addCategoryAction =
  (token: string, category: DataCategoryBD) =>
  async (dispatch: Dispatch): Promise<void> => {
    dispatch(toggleLoaderAction(true));

    await fetch(`${API_CATEGORIES_CREATE}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(category),
    })
      .then(response => response.json())
      .then(json => dispatch(addCategory({...category, id: json.id})))
      .catch(error => console.log(error.message));

    dispatch(toggleLoaderAction(false));
  };

export const updateCategoryAction =
  (token: string, category: DataCategory) =>
  async (dispatch: Dispatch): Promise<void> => {
    dispatch(toggleLoaderAction(true));

    await fetch(`${API_CATEGORIES_UPDATE}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(category),
    })
      .then(response => {
        if (response.status === 400) {
          dispatch(
            toggleErrorAction({
              isErrorState: true,
              messageError: 'This category does not exist!',
            }),
          );
        } else {
          return response.json();
        }
      })
      .then(json => dispatch(updateCategory(json)))
      .catch(error => console.log(error.message));

    dispatch(toggleLoaderAction(false));
  };

export const delCategoryAction =
  (token: string, category: DataCategory) =>
  async (dispatch: Dispatch): Promise<void> => {
    dispatch(toggleLoaderAction(true));

    await fetch(`${API_CATEGORIES_DELETE}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(category),
    })
      .then(response => {
        if (response.status === 400) {
          dispatch(
            toggleErrorAction({
              isErrorState: true,
              messageError: 'This category does not exist!',
            }),
          );
        } else {
          return response.json();
        }
      })
      .then(json => dispatch(delCategory(json)))
      .catch(error => console.error(error.message));

    dispatch(toggleLoaderAction(false));
  };

export const addCategoryChildAction =
  (token: string, category: DataCategoryBD) =>
  async (dispatch: Dispatch): Promise<void> => {
    dispatch(toggleLoaderAction(true));

    await fetch(`${API_CATEGORIES_CREATE_CHILD}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(category),
    })
      .then(response => {
        if (response.status === 400) {
          dispatch(
            toggleErrorAction({
              isErrorState: true,
              messageError: 'The category you are adding to does not exist!',
            }),
          );
        } else {
          return response.json();
        }
      })
      .then(json => {
        dispatch(addCategoryChild({...category, id: json.id}));
      })
      .catch(error => console.error(error.message));

    dispatch(toggleLoaderAction(false));
  };
