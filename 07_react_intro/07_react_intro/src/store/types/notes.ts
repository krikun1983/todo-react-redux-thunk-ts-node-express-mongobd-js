export interface DataNote {
  title: string;
  description: string;
  bgColor: string;
  color: string;
  id: number;
}

export interface DataNotesState {
  dataNotesState: DataNote[];
}

export interface DataNotesAction {
  type: string;
  payload: DataNote | number | DataNote[];
}

export enum DataNotesActionTypes {
  ADD_NOTE = 'ADD_NOTE',
  UPDATE_NOTE = 'UPDATE_NOTE',
  REMOVE_NOTE = 'REMOVE_NOTE',
}
