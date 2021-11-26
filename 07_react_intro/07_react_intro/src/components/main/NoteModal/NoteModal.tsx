import React, {FormEvent} from 'react';
import {DataNotes} from '../../../store/types/notes';
import Button from '../../../Ui-Kit/Button';
import ButtonEnum from '../../../Ui-Kit/Button/type/ui-button-enum';
import style from './NoteModal.module.scss';

interface NoteModalProps {
  isOpenForm: boolean;
  onCloseForm: () => void;
  onSubmitForm: (e: FormEvent<HTMLFormElement>) => void;
  notes?: DataNotes;
}

const NoteModal: React.FC<NoteModalProps> = ({isOpenForm, onCloseForm, onSubmitForm, notes}) => {
  return (
    <>
      {isOpenForm && (
        <div className={style.form_add__container}>
          <form className={style.form_add} onSubmit={onSubmitForm}>
            <input
              type="text"
              className={style.form_add__input}
              placeholder="Enter title"
              defaultValue={notes?.header && notes.header}
            />
            <textarea
              className={style.form_add__text}
              placeholder="note text"
              defaultValue={notes?.text && notes.text}
            />
            <div className={style.form_add__btns}>
              <Button
                text="Create"
                type="submit"
                variant={ButtonEnum.default}
                styles="btn_white_blue"
              />
              <Button
                text="Cancel"
                type="button"
                onClick={onCloseForm}
                variant={ButtonEnum.default}
                styles="btn_white_gray"
              />
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default NoteModal;
