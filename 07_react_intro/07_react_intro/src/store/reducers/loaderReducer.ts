export interface LoaderState {
  isLoaderState: boolean;
}

export interface LoaderAction {
  type: string;
  payload: boolean;
}

export enum LoaderActionTypes {
  TOGGLE_LOADER = 'TOGGLE_LOADER',
}

const initialState: LoaderState = {
  isLoaderState: false,
};

export const loaderReducer = (state = initialState, action: LoaderAction): LoaderState => {
  switch (action.type) {
    case LoaderActionTypes.TOGGLE_LOADER:
      return {...state, isLoaderState: action.payload};
    default:
      return state;
  }
};

export const toggleLoaderAction = (payload: boolean): LoaderAction => ({
  type: LoaderActionTypes.TOGGLE_LOADER,
  payload,
});
