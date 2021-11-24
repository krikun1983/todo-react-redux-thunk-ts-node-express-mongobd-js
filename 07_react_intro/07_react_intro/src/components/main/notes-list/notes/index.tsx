import React, {MouseEvent} from 'react';
import UIButton from '../../../../UI/UIButton';
import EnumUIButton from '../../../../UI/UIButton/type/enum-ui-button';
import style from './Notes.module.scss';

type Props = {
  header: string;
  text: string;
};

const Notes: React.FC<Props> = ({header, text}) => {
  const handelDeleted = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    console.log('Deleted');
  };

  return (
    <>
      <h2 className={style.item__header}>{header}</h2>
      <p className={style.item__text}>{text}</p>
      <div className={style.item__panel}>
        <UIButton onClick={handelDeleted} type={'button'} variant={EnumUIButton.basket} />
      </div>
    </>
  );
};

export default Notes;
