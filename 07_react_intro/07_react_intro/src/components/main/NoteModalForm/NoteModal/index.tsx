import React, {ChangeEvent, Dispatch, FormEvent, SetStateAction, useEffect, useState} from 'react';
import {DataNote} from 'store/types/notes';
import Button from 'Ui-Kit/Button';
import ButtonEnum from 'Ui-Kit/Button/type/ui-button-enum';
import cn from 'classnames';
import style from '../NoteModalForm.module.scss';

interface NoteModalProps {
  isOpenForm: boolean;
  onCloseForm: () => void;
  onSubmitForm: (e: FormEvent<HTMLFormElement>, title: string, description: string) => void;
  note?: DataNote;
  onIsOpenForm: Dispatch<SetStateAction<boolean>>;
}

const NoteModal: React.FC<NoteModalProps> = ({
  isOpenForm,
  onCloseForm,
  onSubmitForm,
  note,
  onIsOpenForm,
}) => {
  const [valueTitle, setValueTitle] = useState<string>(note ? note.title : '');
  const [valueDescription, setValueDescription] = useState<string>(note ? note.description : '');

  const [errorTitle, setErrorTitle] = useState<boolean>(false);
  const [errorDescription, setErrorDescription] = useState<boolean>(false);

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    if (title.length > 30) return;
    setValueTitle(title);
  };

  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const description = e.target.value;
    setValueDescription(description);
  };

  const validate = () => {
    if (valueTitle.length === 0 || (valueTitle.length && valueTitle.trim().length)) {
      setErrorTitle(false);
    } else {
      setErrorTitle(true);
    }
    if (
      valueDescription.length === 0 ||
      (valueDescription.length && valueDescription.trim().length)
    ) {
      setErrorDescription(false);
    } else {
      setErrorDescription(true);
    }
  };

  const resetForm = (): void => {
    setValueTitle('');
    setValueDescription('');
  };

  useEffect(() => {
    validate();
  }, [valueTitle, valueDescription]);

  const handleCloseForm = () => {
    onCloseForm();
    resetForm();
  };

  const handleSubmitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !errorTitle &&
      !errorDescription &&
      (valueTitle.trim().length > 0 || valueDescription.trim().length > 0)
    ) {
      onSubmitForm(e, valueTitle, valueDescription);
      resetForm();
    }
  };

  return (
    <>
      {isOpenForm && (
        <div className={style.form_add__container} onClick={() => onIsOpenForm(false)}>
          <form
            className={style.form_add}
            onSubmit={handleSubmitForm}
            onClick={e => e.stopPropagation()}
          >
            <input
              type="text"
              className={cn(style.form_add__input, errorTitle && style.form_field_error)}
              placeholder="Enter title"
              onChange={handleTitleChange}
              value={valueTitle}
            />
            <div className={style.form_field_title_error}>
              {errorTitle && 'The Title field cannot contain only spaces'}
            </div>
            <textarea
              className={cn(style.form_add__text, errorDescription && style.form_field_error)}
              placeholder="note text"
              onChange={handleDescriptionChange}
              value={valueDescription}
            />
            <div className={style.form_field_desc_error}>
              {errorDescription && 'The Description field cannot contain only spaces'}
            </div>
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
                onClick={handleCloseForm}
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
