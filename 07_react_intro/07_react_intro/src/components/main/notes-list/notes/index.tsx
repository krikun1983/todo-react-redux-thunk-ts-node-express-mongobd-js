import React, {MouseEvent} from 'react';
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
        <button className={style.item__btn} type="button" onClick={handelDeleted}></button>
      </div>
    </>
  );
};

export default Notes;
