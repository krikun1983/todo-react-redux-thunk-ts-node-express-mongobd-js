import {Dispatch, SetStateAction} from 'react';

const validateInput = (
  value: string,
  setState: Dispatch<SetStateAction<boolean>>,
) => {
  if (value.length === 0 || (value.length && value.trim().length)) {
    setState(false);
  } else {
    setState(true);
  }
};

export default validateInput;
