import React, {FormEvent, useState} from 'react';
import {useDispatch} from 'react-redux';
import {addNoteAction} from 'store/noteActions/noteActions';
import Button from 'Ui-Kit/Button';
import IconSVG from 'Ui-Kit/IconSVG';
import {IconNameEnum} from 'Ui-Kit/IconSVG/IconSVG';
import NoteModal from './NoteModal';
import style from './NoteModalForm.module.scss';

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

  const handleSubmit = (
    e: FormEvent<HTMLFormElement>,
    title: string,
    description: string,
    bgColor: string,
    color: string,
  ) => {
    e.preventDefault();
    dispatch(
      addNoteAction({
        title: title,
        description: description,
        bgColor: bgColor,
        color: color,
        id: idMax++,
      }),
    );
    handleClose();
  };

  return (
    <>
      <div className={style.form_add__button}>
        <Button
          type="button"
          onClick={handleClickOpen}
          icon={<IconSVG name={IconNameEnum.PLUS} width="45" height="45" className="white_white" />}
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
