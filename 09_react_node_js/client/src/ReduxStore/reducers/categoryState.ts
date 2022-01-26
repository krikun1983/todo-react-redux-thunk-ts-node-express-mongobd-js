import {
  findIdsForDel,
  getDataCategoryStateClone,
  getDataIdsStateWithoutIdsDel,
} from 'ReduxStore/utils/utils';

export interface DataCategoryBD {
  category: string;
  parentId: null | string;
  children: string[];
}

export interface DataCategory extends DataCategoryBD {
  _id: string;
}

export interface DataCategoryState {
  dataCategoryState: {[key: string]: DataCategory};
  dataIdsState: string[];
}

export interface DataCategoryDefault {
  dataCategories: {[key: string]: DataCategory};
  ids: string[];
}

export interface DataCategoryAction {
  type: string;
  payload?: DataCategory | DataCategoryDefault;
}

export enum DataCategoryActionTypes {
  ADD_CATEGORY = 'ADD_CATEGORY',
  ADD_CATEGORY_DEFAULT = 'ADD_CATEGORY_DEFAULT',
  CLEAR_CATEGORIES_OUTPUT = 'CLEAR_CATEGORIES_OUTPUT',
  UPDATE_CATEGORY = 'UPDATE_CATEGORY',
  DELETE_CATEGORY = 'DELETE_CATEGORY',
  ADD_CATEGORY_CHILD = 'ADD_CATEGORY_CHILD',
}

const initialState: DataCategoryState = {
  dataCategoryState: {},
  dataIdsState: [],
};

export const categoryReducer = (
  state = initialState,
  action: DataCategoryAction,
): DataCategoryState => {
  switch (action.type) {
    case DataCategoryActionTypes.ADD_CATEGORY_DEFAULT:
      return {
        ...state,
        dataIdsState: [
          ...state.dataIdsState,
          ...(action.payload as DataCategoryDefault).ids,
        ],
        dataCategoryState: {
          ...state.dataCategoryState,
          ...(action.payload as DataCategoryDefault).dataCategories,
        },
      };
    case DataCategoryActionTypes.CLEAR_CATEGORIES_OUTPUT:
      return {
        ...state,
        dataIdsState: [],
        dataCategoryState: {},
      };
    case DataCategoryActionTypes.ADD_CATEGORY:
      return {
        ...state,
        dataIdsState: [
          (action.payload as DataCategory)._id,
          ...state.dataIdsState,
        ],
        dataCategoryState: {
          ...state.dataCategoryState,
          [(action.payload as DataCategory)._id]:
            action.payload as DataCategory,
        },
      };
    case DataCategoryActionTypes.UPDATE_CATEGORY:
      return {
        ...state,
        dataCategoryState: {
          ...state.dataCategoryState,
          [(action.payload as DataCategory)._id]: {
            ...state.dataCategoryState[(action.payload as DataCategory)._id],
            category: (action.payload as DataCategory).category,
          },
        },
      };
    case DataCategoryActionTypes.DELETE_CATEGORY:
      return {
        ...state,
        dataIdsState: [
          ...getDataIdsStateWithoutIdsDel(
            state.dataIdsState,
            findIdsForDel(
              [],
              state.dataCategoryState,
              (action.payload as DataCategory)._id,
            ),
          ),
        ],
        dataCategoryState: {
          ...getDataCategoryStateClone(
            state.dataCategoryState,
            action.payload as DataCategory,
          ),
        },
      };
    case DataCategoryActionTypes.ADD_CATEGORY_CHILD:
      return {
        ...state,
        dataIdsState: [
          ...state.dataIdsState,
          (action.payload as DataCategory)._id,
        ],
        dataCategoryState: {
          ...state.dataCategoryState,
          [(action.payload as DataCategory)._id]:
            action.payload as DataCategory,
          [(action.payload as DataCategory).parentId as string]: {
            ...state.dataCategoryState[
              (action.payload as DataCategory).parentId as string
            ],
            children: [
              (action.payload as DataCategory)._id,
              ...state.dataCategoryState[
                (action.payload as DataCategory).parentId as string
              ].children,
            ],
          },
        },
      };
    default:
      return state;
  }
};

export const addDefaultCategory = (
  payload: DataCategoryDefault,
): DataCategoryAction => ({
  type: DataCategoryActionTypes.ADD_CATEGORY_DEFAULT,
  payload,
});

export const clearCategoryOutput = (): DataCategoryAction => ({
  type: DataCategoryActionTypes.CLEAR_CATEGORIES_OUTPUT,
});

export const addCategory = (payload: DataCategory): DataCategoryAction => ({
  type: DataCategoryActionTypes.ADD_CATEGORY,
  payload,
});

export const addCategoryChild = (
  payload: DataCategory,
): DataCategoryAction => ({
  type: DataCategoryActionTypes.ADD_CATEGORY_CHILD,
  payload,
});

export const updateCategory = (payload: DataCategory): DataCategoryAction => ({
  type: DataCategoryActionTypes.UPDATE_CATEGORY,
  payload,
});

export const delCategory = (payload: DataCategory): DataCategoryAction => ({
  type: DataCategoryActionTypes.DELETE_CATEGORY,
  payload,
});
