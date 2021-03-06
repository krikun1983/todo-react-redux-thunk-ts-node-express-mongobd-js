import React, {useEffect} from 'react';
import {Button} from 'UI-Kit';
import style from './FieldFormInput.module.scss';

interface Prop {
  value: string;
  btnName: string;
  disabled: boolean;
  edit: boolean;
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
  onEdit: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const FieldFormInput: React.FC<Prop> = ({
  value,
  btnName,
  disabled,
  edit,
  setEdit,
  onEdit,
  onSubmit,
}) => {
  const editFormRef = React.useRef() as React.MutableRefObject<HTMLFormElement>;

  useEffect(() => {
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
        <input value={value} onChange={onEdit} />
        <Button
          styles="btn_blue"
          type="submit"
          text={btnName}
          disabled={disabled}
        />
      </form>
    </div>
  );
};

export default FieldFormInput;
