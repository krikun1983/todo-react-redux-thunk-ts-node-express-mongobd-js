export interface DataNotes {
  header: string;
  text: string;
  id: number;
}

export interface DataNotesState {
  dataNotesArray: DataNotes[];
}

export interface DataNotesAction {
  type: string;
  payload: DataNotes;
}

export enum DataNotesActionTypes {
  ADD_NOTE = 'ADD_NOTE',
  UPDATE_NOTE = 'UPDATE_NOTE',
  DELETE_NOTE = 'DELETE_NOTE',
}

interface DataNotesAddAction {
  type: DataNotesActionTypes.ADD_NOTE;
}

interface DataNotesUPDATEAction {
  type: DataNotesActionTypes.UPDATE_NOTE;
}

interface DataNotesDeleteAction {
  type: DataNotesActionTypes.DELETE_NOTE;
}

export type DataNotesSuccess = DataNotesAddAction | DataNotesUPDATEAction | DataNotesDeleteAction;
