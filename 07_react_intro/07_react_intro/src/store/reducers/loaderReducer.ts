export interface LoaderState {
  isLoaderState: boolean;
}

export interface LoaderAction {
  type: string;
  payload: boolean;
}

const LOADER_ACTION = 'LOADER_ACTION';

const initialState: LoaderState = {
  isLoaderState: false,
};

export const loaderReducer = (
  state = initialState,
  action: LoaderAction,
): LoaderState => {
  switch (action.type) {
    case LOADER_ACTION:
      return {...state, isLoaderState: action.payload};
    default:
      return state;
  }
};

export const toggleLoaderAction = (payload: boolean): LoaderAction => ({
  type: LOADER_ACTION,
  payload,
});
