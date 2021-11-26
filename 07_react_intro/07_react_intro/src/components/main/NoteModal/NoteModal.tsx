import React, {ChangeEvent, FormEvent, useState} from 'react';
import {DataNotes} from '../../../store/types/notes';
import Button from '../../../Ui-Kit/Button';
import ButtonEnum from '../../../Ui-Kit/Button/type/ui-button-enum';
import style from './NoteModal.module.scss';

interface NoteModalProps {
  isOpenForm: boolean;
  onCloseForm: () => void;
  onSubmitForm: (e: FormEvent<HTMLFormElement>, title: string, description: string) => void;
  notes?: DataNotes;
}

const NoteModal: React.FC<NoteModalProps> = ({isOpenForm, onCloseForm, onSubmitForm, notes}) => {
  const [valueTitle, setValueTitle] = useState<string>(notes ? notes.title : '');
  const [valueDescription, setValueDescription] = useState<string>(notes ? notes.description : '');

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValueTitle(e.target.value);
  };
  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValueDescription(e.target.value);
  };

  const handleSubmitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmitForm(e, valueTitle, valueDescription);
    setValueTitle('');
    setValueDescription('');
  };

  return (
    <>
      {isOpenForm && (
        <div className={style.form_add__container}>
          <form className={style.form_add} onSubmit={handleSubmitForm}>
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
