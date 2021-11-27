import React, {FormEvent, useState} from 'react';
import {useDispatch} from 'react-redux';
import {addNoteActionAsync} from 'store/asyncActions/noteActionAsync';
import Button from 'Ui-Kit/Button';
import ButtonEnum from 'Ui-Kit/Button/type/ui-button-enum';
import NoteModal from './NoteModal';
import style from './NoteModal.module.scss';

let idMax = 4;

const NoteModalForm: React.FC = () => {
  const dispatch = useDispatch();
  const [isOpenForm, setIsOpenForm] = useState<boolean>(false);

  const handleClickOpen = () => {
    setIsOpenForm(true);
  };

  const handleClose = () => {
    setIsOpenForm(false);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>, title: string, description: string) => {
    e.preventDefault();
    dispatch(addNoteActionAsync({title: title, description: description, id: idMax++}));
    handleClose();
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
      <NoteModal
        isOpenForm={isOpenForm}
        onCloseForm={handleClose}
        onSubmitForm={handleSubmit}
        onIsOpenForm={setIsOpenForm}
      />
    </>
  );
};

export default NoteModalForm;
