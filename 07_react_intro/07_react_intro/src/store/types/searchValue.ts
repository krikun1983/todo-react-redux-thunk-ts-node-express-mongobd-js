export interface SearchState {
  searchNoteState: string;
}

export interface SearchAction {
  type: string;
  payload: string;
}

export enum SearchActionTypes {
  SEARCH = 'SEARCH',
}
