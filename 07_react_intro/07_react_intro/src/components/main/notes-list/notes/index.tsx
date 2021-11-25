import React, {MouseEvent} from 'react';
import Button from '../../../../Ui-Kit/Button';
import ButtonEnum from '../../../../Ui-Kit/Button/type/ui-button-enum';
import style from './Notes.module.scss';

type NotesProps = {
  header: string;
  text: string;
};

const Notes: React.FC<NotesProps> = ({header, text}) => {
  const handleDeleted = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    console.log('Deleted');
  };

  return (
    <>
      <h2 className={style.item__header}>{header}</h2>
      <p className={style.item__text}>{text}</p>
      <div className={style.item__panel}>
        <Button onClick={handleDeleted} type={'button'} variant={ButtonEnum.basket} />
      </div>
    </>
  );
};

export default Notes;
