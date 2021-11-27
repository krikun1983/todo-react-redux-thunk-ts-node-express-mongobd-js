import React, {ChangeEvent, Dispatch, FormEvent, SetStateAction, useState} from 'react';
import {DataNote} from '../../../store/types/notes';
import Button from '../../../Ui-Kit/Button';
import ButtonEnum from '../../../Ui-Kit/Button/type/ui-button-enum';
import style from './NoteModal.module.scss';

interface NoteModalProps {
  isOpenForm: boolean;
  onCloseForm: () => void;
  onSubmitForm: (e: FormEvent<HTMLFormElement>, title: string, description: string) => void;
  notes?: DataNote;
  onIsOpenForm: Dispatch<SetStateAction<boolean>>;
}

const NoteModal: React.FC<NoteModalProps> = ({
  isOpenForm,
  onCloseForm,
  onSubmitForm,
  notes,
  onIsOpenForm,
}) => {
  const [valueTitle, setValueTitle] = useState<string>(notes ? notes.title : '');
  const [valueDescription, setValueDescription] = useState<string>(notes ? notes.description : '');

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    if (title.length > 30) return;
    if (title.length !== 0) {
      setValueTitle(title);
    }
  };
  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const description = e.target.value;
    if (description.length !== 0) {
      setValueDescription(description);
    }
  };

  const handleSubmitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (valueTitle.trim() || valueDescription.trim()) {
      onSubmitForm(e, valueTitle, valueDescription);
      setValueTitle('');
      setValueDescription('');
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
              className={style.form_add__input}
              placeholder="Enter title"
              onChange={handleTitleChange}
              value={valueTitle}
            />
            <textarea
              className={style.form_add__text}
              placeholder="note text"
              onChange={handleDescriptionChange}
              value={valueDescription}
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
