import {DATA_CATEGORIES, DATA_IDS} from 'ReduxStore/data/data-categories';

export interface DataCategory {
  category: string;
  parentId: null | number;
  children: number[];
  id: number;
}

export interface DataCategoryState {
  dataCategoryState: {[key: number]: DataCategory};
  dataIdsState: number[];
}

export interface DataCategoryAction {
  type: string;
  payload: DataCategory;
}

export enum DataCategoryActionTypes {
  ADD_CATEGORY = 'ADD_CATEGORY',
  UPDATE_CATEGORY = 'UPDATE_CATEGORY',
  REMOVE_CATEGORY = 'REMOVE_CATEGORY',
  ADD_IDS = 'ADD_IDS',
}

const initialState: DataCategoryState = {
  dataCategoryState: DATA_CATEGORIES,
  dataIdsState: [...DATA_IDS],
};

export const categoryReducer = (
  state = initialState,
  action: DataCategoryAction,
): DataCategoryState => {
  switch (action.type) {
    case DataCategoryActionTypes.ADD_CATEGORY:
      return {
        ...state,
        dataIdsState: [action.payload.id, ...state.dataIdsState],
        dataCategoryState: {
          ...state.dataCategoryState,
          [action.payload.id]: action.payload,
        },
      };
    default:
      return state;
  }
};

export const addCategory = (payload: DataCategory): DataCategoryAction => ({
  type: DataCategoryActionTypes.ADD_CATEGORY,
  payload,
});
