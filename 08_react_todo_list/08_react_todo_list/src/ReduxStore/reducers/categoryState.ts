import {DATA_CATEGORIES, DATA_IDS} from 'ReduxStore/data/data-categories';
import {
  findIdsForDel,
  getDataCategoryStateClone,
  getDataIdsStateWithoutIdsDel,
} from 'ReduxStore/services/services';

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
  DELETE_CATEGORY = 'DELETE_CATEGORY',
  ADD_CATEGORY_CHILD = 'ADD_CATEGORY_CHILD',
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
    case DataCategoryActionTypes.UPDATE_CATEGORY:
      return {
        ...state,
        dataCategoryState: {
          ...state.dataCategoryState,
          [action.payload.id]: {
            ...state.dataCategoryState[action.payload.id],
            category: action.payload.category,
          },
        },
      };
    case DataCategoryActionTypes.DELETE_CATEGORY:
      return {
        ...state,
        dataIdsState: [
          ...getDataIdsStateWithoutIdsDel(
            state.dataIdsState,
            findIdsForDel([], state.dataCategoryState, action.payload.id),
          ),
        ],
        dataCategoryState: {
          ...getDataCategoryStateClone(state.dataCategoryState, action.payload),
        },
      };
    case DataCategoryActionTypes.ADD_CATEGORY_CHILD:
      return {
        ...state,
        dataIdsState: [...state.dataIdsState, action.payload.id],
        dataCategoryState: {
          ...state.dataCategoryState,
          [action.payload.id]: action.payload,
          [action.payload.parentId as number]: {
            ...state.dataCategoryState[action.payload.parentId as number],
            children: [
              action.payload.id,
              ...state.dataCategoryState[action.payload.parentId as number]
                .children,
            ],
          },
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
