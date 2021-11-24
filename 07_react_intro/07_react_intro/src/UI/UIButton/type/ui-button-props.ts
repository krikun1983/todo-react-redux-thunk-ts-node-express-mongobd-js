import {MouseEvent} from 'react';

type UiButtonProps = {
  text?: string;
  type: 'button' | 'submit';
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  variant: string;
};

export default UiButtonProps;
