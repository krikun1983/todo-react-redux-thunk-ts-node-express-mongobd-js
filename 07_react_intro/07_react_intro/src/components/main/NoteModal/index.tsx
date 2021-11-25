import React, {FormEvent, useState} from 'react';
import Button from '../../../Ui-Kit/Button';
import ButtonEnum from '../../../Ui-Kit/Button/type/ui-button-enum';
import NoteModal from './NoteModal';

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
      <Button text="+" type="button" onClick={handleClickOpen} variant={ButtonEnum.add_new_note} />

      <NoteModal isOpenForm={isOpenForm} onCloseForm={handleClose} onSubmitForm={handleSubmit} />
    </>
  );
};

export default NoteModalForm;
