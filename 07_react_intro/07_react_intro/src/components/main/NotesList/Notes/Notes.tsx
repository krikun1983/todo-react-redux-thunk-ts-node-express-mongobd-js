import React, {MouseEvent} from 'react';
import Button from 'Ui-Kit/Button';
import IconSVG from 'Ui-Kit/IconSVG';
import {IconNameEnum} from 'Ui-Kit/IconSVG/IconSVG';
import style from './Notes.module.scss';

type NotesProps = {
  title: string;
  description: string;
  onOpenFormDeleteNote: (e: MouseEvent<HTMLButtonElement>) => void;
};

const Notes: React.FC<NotesProps> = ({title, description, onOpenFormDeleteNote}) => {
  return (
    <>
      <h2 className={style.item__header}>{title}</h2>
      <p className={style.item__text}>{description}</p>
      <div className={style.item__panel}>
        <Button
          styles="btn_icon"
          onClick={onOpenFormDeleteNote}
          type="button"
          icon={
            <IconSVG name={IconNameEnum.BASKET} width="30" height="32" className="gray_white" />
          }
        />
      </div>
    </>
  );
};

export default Notes;
