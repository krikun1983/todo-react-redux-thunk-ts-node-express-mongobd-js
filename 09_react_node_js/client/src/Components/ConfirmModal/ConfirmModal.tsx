import React, {
  Dispatch,
  MouseEvent,
  SetStateAction,
  useEffect,
  useRef,
} from 'react';
import {Button} from 'UI-Kit';
import style from './ConfirmModal.module.scss';

interface Props {
  isOpenFormDelCategory: boolean;
  onDelCategory: () => void;
  onCloseForm: () => void;
  onOpenFormDeleteCategory: Dispatch<SetStateAction<boolean>>;
}

const ConfirmModal: React.FC<Props> = ({
  isOpenFormDelCategory,
  onDelCategory,
  onCloseForm,
  onOpenFormDeleteCategory,
}) => {
  const btnYes = useRef() as React.MutableRefObject<HTMLButtonElement>;
  const btnNo = useRef() as React.MutableRefObject<HTMLButtonElement>;

  useEffect(() => {
    btnYes.current.focus();

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.code === 'Escape') {
        onCloseForm();
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    return () => document.removeEventListener('keydown', handleEscapeKey);
  }, []);

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
              <Button
                ref={btnYes}
                text="Yes"
                tabIndex={1}
                onClick={onDelCategory}
                styles="btn_blue"
                onBlur={() => btnNo.current.focus()}
              />
              <Button
                ref={btnNo}
                text="No"
                tabIndex={2}
                onClick={onCloseForm}
                styles="btn_gray"
                onBlur={() => btnYes.current.focus()}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ConfirmModal;
