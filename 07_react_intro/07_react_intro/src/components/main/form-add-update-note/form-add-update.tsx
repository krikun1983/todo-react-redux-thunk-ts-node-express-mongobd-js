import React, {FormEvent} from 'react';
import {DataNotes} from '../../../store/types/notes';
import UIButton from '../../../UI/UIButton';
import UIButtonEnum from '../../../UI/UIButton/type/ui-button-enum';
import style from './FormAddUpdate.module.scss';

interface Props {
  isOpenForm: boolean;
  onCloseForm: () => void;
  onSubmitForm: (e: FormEvent<HTMLFormElement>) => void;
  notes?: DataNotes;
}

const FormAddUpdate: React.FC<Props> = ({isOpenForm, onCloseForm, onSubmitForm, notes}) => {
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
              <UIButton text="Create" type="submit" variant={UIButtonEnum.create} />
              <UIButton
                text="Cancel"
                type="button"
                onClick={onCloseForm}
                variant={UIButtonEnum.cancel}
              />
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default FormAddUpdate;
