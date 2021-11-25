import React, {FormEvent} from 'react';
import {DataNotes} from '../../../store/types/notes';
import Button from '../../../Ui-Kit/Button';
import ButtonEnum from '../../../Ui-Kit/Button/type/ui-button-enum';
import style from './FormAddUpdate.module.scss';

interface Props {
  isOpenForm: boolean;
  onCloseForm: () => void;
  onSubmitForm: (e: FormEvent<HTMLFormElement>) => void;
  notes?: DataNotes;
}

const NoteModal: React.FC<Props> = ({isOpenForm, onCloseForm, onSubmitForm, notes}) => {
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
              <Button text="Create" type="submit" variant={ButtonEnum.create} />
              <Button
                text="Cancel"
                type="button"
                onClick={onCloseForm}
                variant={ButtonEnum.cancel}
              />
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default NoteModal;
