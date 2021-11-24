export interface SearchState {
  searchValueState: string;
}

export interface SearchAction {
  type: string;
  payload: string;
}

export enum SearchActionTypes {
  SEARCH = 'SEARCH',
}
