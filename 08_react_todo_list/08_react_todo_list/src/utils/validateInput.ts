import {Dispatch, SetStateAction} from 'react';

const validateInput = (
  value: string,
  setState: Dispatch<SetStateAction<boolean>>,
): void => {
  if (value.length && value.trim().length) {
    setState(false);
  } else {
    setState(true);
  }
};

export default validateInput;
