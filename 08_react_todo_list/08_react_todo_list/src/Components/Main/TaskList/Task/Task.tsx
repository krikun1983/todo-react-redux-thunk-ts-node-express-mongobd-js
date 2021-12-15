import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {isDoneTaskAction} from 'ReduxStore/reducers/taskState';
import {Button, IconSVG} from 'UI-Kit';
import {IconNameEnum} from 'UI-Kit/IconSVG/IconSVG';
import style from './Task.module.scss';

interface Props {
  title: string;
  description: string;
  isDone: boolean;
  id: number;
}

const Task: React.FC<Props> = ({title, description, isDone, id}) => {
  const dispatch = useDispatch();
  const [editTask, setTaskCategory] = useState<boolean>(false);

  const handleChecked = () => {
    dispatch(isDoneTaskAction(id));
  };

  return (
    <>
      <span>
        <input
          className={style.checkbox}
          id="task"
          type="checkbox"
          checked={isDone}
          onChange={handleChecked}
        />
      </span>
      <h3 className={isDone ? style.task__title_gray : style.task__title}>
        {title}
      </h3>
      {/* <p className={style.task__description}>{description}</p> */}
      <Button
        title="Edit name task"
        styles="btn_icon_bg_white"
        type="button"
        disabled={isDone}
        onClick={() => setTaskCategory(true)}
        icon={
          <IconSVG
            name={IconNameEnum.EDIT}
            width="30"
            height="30"
            className={isDone ? 'gray_blue_dark_disabled' : 'blue_dark_gray'}
          />
        }
      />
    </>
  );
};

export default Task;
