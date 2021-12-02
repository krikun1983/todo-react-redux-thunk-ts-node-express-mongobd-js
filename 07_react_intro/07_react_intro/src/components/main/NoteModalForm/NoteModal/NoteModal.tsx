import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import {DataNote} from 'store/types/notes';
import Button from 'Ui-Kit/Button';
import cn from 'classnames';
import style from '../NoteModalForm.module.scss';
import validateInput from 'utils/validateInput';

interface NoteModalProps {
  isOpenForm: boolean;
  onCloseForm: () => void;
  onSubmitForm: (
    e: FormEvent<HTMLFormElement>,
    title: string,
    description: string,
    bgColor: string,
    color: string,
  ) => void;
  note?: DataNote | null;
}

const initValue = {
  title: '',
  description: '',
  bgColor: '#ffffff',
  color: '#000000',
  id: 0,
};

const NoteModal: React.FC<NoteModalProps> = ({
  isOpenForm,
  onCloseForm,
  onSubmitForm,
  note,
}) => {
  const [valueNote, setValueNote] = useState<DataNote>(note ? note : initValue);

  const [errorTitle, setErrorTitle] = useState<boolean>(false);
  const [errorDescription, setErrorDescription] = useState<boolean>(false);

  const divRef = useRef() as React.MutableRefObject<HTMLFormElement>;

  const resetForm = (): void => {
    setValueNote(initValue);
  };

  useEffect(() => {
    const closeFormIfClickOutside = (e: MouseEvent) => {
      if (
        isOpenForm &&
        divRef.current &&
        !divRef.current.contains(e.target as HTMLFormElement)
      ) {
        onCloseForm();
      }
    };

    document.addEventListener('mousedown', (e: MouseEvent) =>
      closeFormIfClickOutside(e),
    );

    return () => {
      document.removeEventListener('mousedown', (e: MouseEvent) =>
        closeFormIfClickOutside(e),
      );
    };
  }, [isOpenForm]);

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    if (title.length > 30) return;
    setValueNote(prev => ({...prev, title: title}));
  };

  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const description = e.target.value;
    setValueNote(prev => ({...prev, description: description}));
  };

  const handleBgColorChange = (e: ChangeEvent<HTMLInputElement>) => {
    const BgColor = e.target.value;
    setValueNote(prev => ({...prev, bgColor: BgColor}));
  };

  const handleColorChange = (e: ChangeEvent<HTMLInputElement>) => {
    const color = e.target.value;
    setValueNote(prev => ({...prev, color: color}));
  };

  useEffect(() => {
    validateInput(valueNote.title, setErrorTitle);
    validateInput(valueNote.description, setErrorDescription);
  }, [valueNote.title, valueNote.description]);

  const handleSubmitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !errorTitle &&
      !errorDescription &&
      (valueNote.title.trim().length > 0 ||
        valueNote.description.trim().length > 0)
    ) {
      onSubmitForm(
        e,
        valueNote.title,
        valueNote.description,
        valueNote.bgColor,
        valueNote.color,
      );
      resetForm();
    }
  };

  return (
    <>
      {isOpenForm && (
        <div className={style.form_add__container}>
          <form
            className={style.form_add}
            onSubmit={handleSubmitForm}
            ref={divRef}
            style={{
              backgroundColor: valueNote.bgColor,
              color: valueNote.color,
            }}
          >
            <input
              type="text"
              className={cn(
                style.form_add__input,
                errorTitle && style.form_field_error,
              )}
              placeholder="Enter title"
              onChange={handleTitleChange}
              value={valueNote.title}
            />
            <div className={style.form_field_title_error}>
              {errorTitle && 'The Title field cannot contain only spaces'}
            </div>
            <textarea
              className={cn(
                style.form_add__text,
                errorDescription && style.form_field_error,
              )}
              placeholder="note text"
              onChange={handleDescriptionChange}
              value={valueNote.description}
            />
            <div className={style.form_field_desc_error}>
              {errorDescription &&
                'The Description field cannot contain only spaces'}
            </div>
            <div className={style.form_add__btns}>
              <label htmlFor="bg-color">
                Background Note
                <input
                  className={style.form_add__colors}
                  type="color"
                  onChange={handleBgColorChange}
                  value={valueNote.bgColor}
                  id="bg-color"
                />
              </label>
              <label htmlFor="bg-color">
                Color text note
                <input
                  className={style.form_add__colors}
                  type="color"
                  onChange={handleColorChange}
                  value={valueNote.color}
                />
              </label>
              <Button
                text={note ? 'Update' : 'Create'}
                type="submit"
                styles="btn_white_blue"
              />
              <Button
                text="Cancel"
                type="button"
                onClick={onCloseForm}
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
