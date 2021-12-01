import React, {Dispatch, MouseEvent, SetStateAction} from 'react';
import Button from 'Ui-Kit/Button';
import style from './ConfirmModal.module.scss';

type ConfirmModalProps = {
  isOpenFormDeleteNote: boolean;
  onDeleteNote: () => void;
  onCloseForm: (e: MouseEvent<HTMLButtonElement | HTMLDivElement>) => void;
  onIsOpenFormDeleteNote: Dispatch<SetStateAction<boolean>>;
};

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpenFormDeleteNote,
  onDeleteNote,
  onCloseForm,
  onIsOpenFormDeleteNote,
}) => {
  return (
    <>
      {isOpenFormDeleteNote && (
        <div className={style.modal__container} onClick={() => onIsOpenFormDeleteNote(false)}>
          <div className={style.modal__wrapper} onClick={e => e.stopPropagation()}>
            <div className={style.modal__question}>Are you sure you need to delete the note?</div>
            <div className={style.modal__btns}>
              <Button text="Yes" onClick={onDeleteNote} styles="btn_white_blue" />
              <Button text="No" onClick={onCloseForm} styles="btn_white_gray" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ConfirmModal;
