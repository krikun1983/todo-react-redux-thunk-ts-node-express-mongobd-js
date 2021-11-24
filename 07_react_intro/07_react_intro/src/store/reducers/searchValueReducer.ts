import {SearchAction, SearchActionTypes, SearchState} from '../types/searchValue';

const initialState: SearchState = {
  searchValueState: '',
};

const searchReducer = (state = initialState, action: SearchAction): SearchState => {
  switch (action.type) {
    case SearchActionTypes.SEARCH:
      return {...state, searchValueState: action.payload};
    default:
      return state;
  }
};

export default searchReducer;
