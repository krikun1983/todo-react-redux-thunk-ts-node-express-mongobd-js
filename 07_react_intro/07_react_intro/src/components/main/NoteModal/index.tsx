import React, {FormEvent, useState} from 'react';
import Button from '../../../Ui-Kit/Button';
import ButtonEnum from '../../../Ui-Kit/Button/type/ui-button-enum';
import NoteModal from './NoteModal';
import style from './NoteModal.module.scss';

const NoteModalForm: React.FC = () => {
  const [isOpenForm, setIsOpenForm] = useState<boolean>(false);

  const handleClickOpen = () => {
    setIsOpenForm(true);
  };

  const handleClose = () => {
    setIsOpenForm(false);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('add nodes');
  };

  return (
    <>
      <div className={style.form_add__button}>
        <Button
          text="+"
          type="button"
          onClick={handleClickOpen}
          variant={ButtonEnum.default}
          styles="btn_circle_blue"
        />
      </div>
      <NoteModal isOpenForm={isOpenForm} onCloseForm={handleClose} onSubmitForm={handleSubmit} />
    </>
  );
};

export default NoteModalForm;
