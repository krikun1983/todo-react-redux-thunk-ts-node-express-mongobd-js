import React, {FormEvent, useState} from 'react';
import UIButton from '../../../UI/UIButton';
import EnumUIButton from '../../../UI/UIButton/type/enum-ui-button';
import FormAddUpdate from './form-add-update';

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
        variant={EnumUIButton.add_new_note}
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
