import AuthContext from 'context/authContext';
import useDispatcher from 'hook/useDispatcher';
import React, {memo, useCallback, useContext} from 'react';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {RootState} from 'ReduxStore/types/rootState';
import {IconNameEnum, IconSVG} from 'UI-Kit';
import style from './Task.module.scss';

interface Props {
  id: string;
}

const Task: React.FC<Props> = ({id}) => {
  const currentTask = useSelector(
    (state: RootState) => state.dataTaskState.dataTaskState[id],
  );

  const {setDoneTaskAction} = useDispatcher();

  const auth = useContext(AuthContext);

  const handleChecked = useCallback(() => {
    setDoneTaskAction(auth.accessToken, id);
  }, [setDoneTaskAction]);

  return (
    <>
      <span>
        <input
          className={style.checkbox}
          id="task"
          type="checkbox"
          checked={currentTask.isDone}
          onChange={handleChecked}
        />
      </span>
      <h3
        className={
          currentTask.isDone ? style.task__title_gray : style.task__title
        }
      >
        {currentTask.title}
      </h3>
      <Link to={`/categories/${currentTask.categoryId}/task/${id}/edit`}>
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
