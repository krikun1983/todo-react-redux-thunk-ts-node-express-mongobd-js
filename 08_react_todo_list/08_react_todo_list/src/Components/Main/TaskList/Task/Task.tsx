import useDispatcher from 'hook/useDispatcher';
import React, {memo, useCallback} from 'react';
import {Link} from 'react-router-dom';
import {IconNameEnum, IconSVG} from 'UI-Kit';
import style from './Task.module.scss';

interface Props {
  title: string;
  categoryId: number;
  isDone: boolean;
  id: number;
}

const Task: React.FC<Props> = ({title, categoryId, isDone, id}) => {
  const {setDoneTaskAction} = useDispatcher();

  const handleChecked = useCallback(() => {
    setDoneTaskAction(id);
  }, [setDoneTaskAction]);

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
      <Link to={`/categories/${categoryId}/task/${id}/edit`}>
        <IconSVG
          name={IconNameEnum.EDIT}
          width="30"
          height="30"
          className="blue_dark_gray"
        />
      </Link>
    </>
  );
};

export default memo(Task);
