import React, {MouseEvent} from 'react';
import Button from 'Ui-Kit/Button';
import ButtonEnum from 'Ui-Kit/Button/type/ui-button-enum';
import IconSvg from 'Ui-Kit/IconSVG';
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
        <div>
          <Button
            variant={ButtonEnum.icon_basket}
            styles="btn_icon"
            onClick={onOpenFormDeleteNote}
            type="button"
            icon={<IconSvg name="basket" width="30" height="32" className="basket_gray_white" />}
          />
        </div>
      </div>
    </>
  );
};

export default Notes;
