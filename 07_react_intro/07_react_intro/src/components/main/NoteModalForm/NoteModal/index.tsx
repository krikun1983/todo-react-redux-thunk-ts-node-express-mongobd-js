import React, {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import {DataNote} from 'store/types/notes';
import Button from 'Ui-Kit/Button';
import ButtonEnum from 'Ui-Kit/Button/type/ui-button-enum';
import cn from 'classnames';
import style from '../NoteModalForm.module.scss';

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
  const [valueBgColorNote, setValueBgColorNote] = useState<string>(note ? note.bgColor : '#ffffff');
  const [valueColorNote, setValueColorNote] = useState<string>(note ? note.color : '#000000');

  const [errorTitle, setErrorTitle] = useState<boolean>(false);
  const [errorDescription, setErrorDescription] = useState<boolean>(false);

  const divRef = useRef() as React.MutableRefObject<HTMLFormElement>;

  useEffect(() => {
    const closeFormIfClickOutside = (e: globalThis.MouseEvent) => {
      if (isOpenForm && divRef.current && !divRef.current.contains(e.target as HTMLFormElement)) {
        onIsOpenForm(false);
      }
    };

    document.addEventListener('mousedown', e => closeFormIfClickOutside(e));

    return () => {
      document.removeEventListener('mousedown', e => closeFormIfClickOutside(e));
    };
  }, [isOpenForm]);

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    if (title.length > 30) return;
    setValueTitle(title);
  };

  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const description = e.target.value;
    setValueDescription(description);
  };

  const handleBgColorChange = (e: ChangeEvent<HTMLInputElement>) => {
    const BgColor = e.target.value;
    setValueBgColorNote(BgColor);
  };

  const handleColorChange = (e: ChangeEvent<HTMLInputElement>) => {
    const color = e.target.value;
    setValueColorNote(color);
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
      onSubmitForm(e, valueTitle, valueDescription, valueBgColorNote, valueColorNote);
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
            style={{backgroundColor: valueBgColorNote, color: valueColorNote}}
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
              <label htmlFor="bg-color">
                Background Note
                <input
                  className={style.form_add__colors}
                  type="color"
                  onChange={handleBgColorChange}
                  value={valueBgColorNote}
                  id="bg-color"
                />
              </label>
              <label htmlFor="bg-color">
                Color text note
                <input
                  className={style.form_add__colors}
                  type="color"
                  onChange={handleColorChange}
                  value={valueColorNote}
                />
              </label>
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
