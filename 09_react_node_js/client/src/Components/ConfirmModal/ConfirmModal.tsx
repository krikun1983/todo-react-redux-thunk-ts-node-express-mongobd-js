import React, {Dispatch, MouseEvent, SetStateAction} from 'react';
import {Button} from 'UI-Kit';
import style from './ConfirmModal.module.scss';

interface Props {
  isOpenFormDelCategory: boolean;
  onDelCategory: () => void;
  onCloseForm: (e: MouseEvent<HTMLButtonElement | HTMLDivElement>) => void;
  onOpenFormDeleteCategory: Dispatch<SetStateAction<boolean>>;
}

const ConfirmModal: React.FC<Props> = ({
  isOpenFormDelCategory,
  onDelCategory,
  onCloseForm,
  onOpenFormDeleteCategory,
}) => {
  return (
    <>
      {isOpenFormDelCategory && (
        <div
          className={style.modal__container}
          onClick={() => onOpenFormDeleteCategory(false)}
        >
          <div
            className={style.modal__wrapper}
            onClick={(e: MouseEvent) => e.stopPropagation()}
          >
            <div className={style.modal__question}>
              Are you sure you need to delete the category?
            </div>
            <div className={style.modal__btns}>
              <Button text="Yes" onClick={onDelCategory} styles="btn_blue" />
              <Button text="No" onClick={onCloseForm} styles="btn_gray" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ConfirmModal;
