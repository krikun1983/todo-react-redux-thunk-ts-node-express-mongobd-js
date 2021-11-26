import React from 'react';
import Button from '../../../Ui-Kit/Button';
import ButtonEnum from '../../../Ui-Kit/Button/type/ui-button-enum';
import style from './ConfirmModal.module.scss';

type ConfirmModalProps = {
  isOpenFormDeleteNote: boolean;
  onDeleteNote: () => void;
  onCloseForm: () => void;
};

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpenFormDeleteNote,
  onDeleteNote,
  onCloseForm,
}) => {
  return (
    <>
      {isOpenFormDeleteNote && (
        <div className={style.modal__container}>
          <div className={style.modal__wrapper}>
            <div className={style.modal__question}>Are you sure you need to delete the note?</div>
            <div className={style.modal__btns}>
              <Button
                text="Yes"
                variant={ButtonEnum.default}
                onClick={onDeleteNote}
                styles="btn_white_blue"
              />
              <Button
                text="No"
                variant={ButtonEnum.default}
                onClick={onCloseForm}
                styles="btn_white_gray"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ConfirmModal;
