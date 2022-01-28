export interface ErrorState {
  isErrorState: boolean;
  messageError: string;
}

export interface ErrorAction {
  type: string;
  payload: ErrorState;
}

const ERROR_ACTION = 'ERROR_ACTION';

const initialState: ErrorState = {
  isErrorState: false,
  messageError: '',
};

export const errorReducer = (
  state = initialState,
  action: ErrorAction,
): ErrorState => {
  switch (action.type) {
    case ERROR_ACTION:
      return {
        ...state,
        isErrorState: action.payload.isErrorState,
        messageError: action.payload.messageError,
      };
    default:
      return state;
  }
};

export const toggleErrorAction = (payload: ErrorState): ErrorAction => ({
  type: ERROR_ACTION,
  payload,
});
