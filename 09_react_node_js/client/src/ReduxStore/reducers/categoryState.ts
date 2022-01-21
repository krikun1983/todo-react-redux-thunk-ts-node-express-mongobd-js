import {
  findIdsForDel,
  getDataCategoryStateClone,
  getDataIdsStateWithoutIdsDel,
} from 'ReduxStore/utils/utils';

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

export interface DataCategoryDefault {
  data_categories: {[key: number]: DataCategory};
  ids: number[];
}

export interface DataCategoryAction {
  type: string;
  payload: DataCategory | DataCategoryDefault;
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
          ...(action.payload as DataCategoryDefault).data_categories,
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
          (action.payload as DataCategory).id,
          ...state.dataIdsState,
        ],
        dataCategoryState: {
          ...state.dataCategoryState,
          [(action.payload as DataCategory).id]: action.payload as DataCategory,
        },
      };
    case DataCategoryActionTypes.UPDATE_CATEGORY:
      return {
        ...state,
        dataCategoryState: {
          ...state.dataCategoryState,
          [(action.payload as DataCategory).id]: {
            ...state.dataCategoryState[(action.payload as DataCategory).id],
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
              (action.payload as DataCategory).id,
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
          (action.payload as DataCategory).id,
        ],
        dataCategoryState: {
          ...state.dataCategoryState,
          [(action.payload as DataCategory).id]: action.payload as DataCategory,
          [(action.payload as DataCategory).parentId as number]: {
            ...state.dataCategoryState[
              (action.payload as DataCategory).parentId as number
            ],
            children: [
              (action.payload as DataCategory).id,
              ...state.dataCategoryState[
                (action.payload as DataCategory).parentId as number
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

export const clearCategoryOutput = () => ({
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
