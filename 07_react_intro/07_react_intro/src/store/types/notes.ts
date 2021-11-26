export interface DataNotes {
  title: string;
  description: string;
  id: number;
}

export interface DataNotesState {
  dataNotesState: DataNotes[];
}

export interface DataNotesAction {
  type: string;
  payload: DataNotes | number;
}

export enum DataNotesActionTypes {
  ADD_NOTE = 'ADD_NOTE',
  UPDATE_NOTE = 'UPDATE_NOTE',
  REMOVE_NOTE = 'REMOVE_NOTE',
}

interface DataNotesAddAction {
  type: DataNotesActionTypes.ADD_NOTE;
}

interface DataNotesUPDATEAction {
  type: DataNotesActionTypes.UPDATE_NOTE;
}

interface DataNotesDeleteAction {
  type: DataNotesActionTypes.REMOVE_NOTE;
}

export type DataNotesSuccess = DataNotesAddAction | DataNotesUPDATEAction | DataNotesDeleteAction;
