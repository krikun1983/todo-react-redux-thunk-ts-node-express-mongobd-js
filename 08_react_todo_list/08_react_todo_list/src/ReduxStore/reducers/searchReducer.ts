export interface SearchState {
  searchTaskState: string;
}

export interface SearchAction {
  type: string;
  payload: string;
}

const searchAction = 'search';

const initialState: SearchState = {
  searchTaskState: '',
};

export const searchReducer = (
  state = initialState,
  action: SearchAction,
): SearchState => {
  switch (action.type) {
    case searchAction:
      return {...state, searchTaskState: action.payload};
    default:
      return state;
  }
};

export const searchNoteAction = (payload: string): SearchAction => ({
  type: searchAction,
  payload,
});
