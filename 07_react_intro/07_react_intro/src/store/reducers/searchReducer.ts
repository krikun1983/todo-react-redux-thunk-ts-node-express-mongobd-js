import {SearchAction, SearchActionTypes, SearchState} from '../types/searchValue';

const initialState: SearchState = {
  searchNoteState: '',
};

export const searchReducer = (state = initialState, action: SearchAction): SearchState => {
  switch (action.type) {
    case SearchActionTypes.SEARCH:
      return {...state, searchNoteState: action.payload};
    default:
      return state;
  }
};

export const searchNoteAction = (payload: string): SearchAction => ({
  type: SearchActionTypes.SEARCH,
  payload,
});
