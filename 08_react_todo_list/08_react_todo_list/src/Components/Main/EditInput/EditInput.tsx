import React from 'react';
import {Button, Input} from 'UI-Kit';
import {InputNameEnum} from 'UI-Kit/Input/Input';
import style from './EditInput.module.scss';

interface Prop {
  height: string;
  value: string;
  edit: boolean;
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
  onEdit: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const EditInput: React.FC<Prop> = ({
  height,
  value,
  edit,
  setEdit,
  onEdit,
  onSubmit,
}) => {
  const editFormRef = React.useRef() as React.MutableRefObject<HTMLFormElement>;

  React.useEffect(() => {
    const closeEditFormIfClickOutside = (e: MouseEvent) => {
      if (
        edit &&
        editFormRef.current &&
        !editFormRef.current.contains(e.target as HTMLFormElement)
      ) {
        setEdit(false);
      }
    };

    document.addEventListener('mousedown', (e: MouseEvent) =>
      closeEditFormIfClickOutside(e),
    );

    return () => {
      document.removeEventListener('mousedown', (e: MouseEvent) =>
        closeEditFormIfClickOutside(e),
      );
    };
  }, [edit]);

  return (
    <div className={style.edit}>
      <form onSubmit={onSubmit} className={style.edit_form} ref={editFormRef}>
        <Input
          width="100%"
          height={height}
          type="text"
          styles={InputNameEnum.TEXT}
          value={value}
          onChange={onEdit}
        />
        <Button styles="btn_blue" height={height} type="submit" text="Edit" />
      </form>
    </div>
  );
};

export default EditInput;
