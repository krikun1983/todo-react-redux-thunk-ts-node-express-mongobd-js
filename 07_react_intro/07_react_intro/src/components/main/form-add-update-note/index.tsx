import React, {FormEvent, useState} from 'react';
import UIButton from '../../../UI/UIButton';
import UIButtonEnum from '../../../UI/UIButton/type/ui-button-enum';
import FormAddUpdate from './Form-add-update';

const FormAddUpdateNote: React.FC = () => {
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
      <UIButton
        text="+"
        type="button"
        onClick={handleClickOpen}
        variant={UIButtonEnum.add_new_note}
      />

      <FormAddUpdate
        isOpenForm={isOpenForm}
        onCloseForm={handleClose}
        onSubmitForm={handleSubmit}
      />
    </>
  );
};

export default FormAddUpdateNote;
