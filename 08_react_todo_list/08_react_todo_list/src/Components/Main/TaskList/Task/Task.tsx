import React, {useState} from 'react';
import {Button, IconSVG} from 'UI-Kit';
import {IconNameEnum} from 'UI-Kit/IconSVG/IconSVG';
import style from './Task.module.scss';

interface Props {
  title: string;
  description: string;
}

const Task: React.FC<Props> = ({title, description}) => {
  const [checked, setChecked] = useState(false);
  const [editCategory, setEditCategory] = useState<boolean>(false);

  const handleChecked = () => {
    setChecked(!checked);
  };

  return (
    <>
      <span>
        <input
          className={style.checkbox}
          id="task"
          type="checkbox"
          checked={checked}
          onChange={handleChecked}
        />
      </span>
      <h3 className={checked ? style.task__title_gray : style.task__title}>
        {title}
      </h3>
      {/* <p className={style.task__description}>{description}</p> */}
      <Button
        title="Edit name task"
        styles="btn_icon_bg_white"
        type="button"
        disabled={checked}
        onClick={() => setEditCategory(true)}
        icon={
          <IconSVG
            name={IconNameEnum.EDIT}
            width="30"
            height="30"
            className={checked ? 'gray_blue_dark_disabled' : 'blue_dark_gray'}
          />
        }
      />
    </>
  );
};

export default Task;
