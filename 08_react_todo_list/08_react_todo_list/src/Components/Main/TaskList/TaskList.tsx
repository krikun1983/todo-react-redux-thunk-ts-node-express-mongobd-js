import React from 'react';
import {useSelector} from 'react-redux';
import {RootState} from 'ReduxStore/types/rootState';
import Task from './Task/Task';
import style from './TaskList.module.scss';

const TaskList: React.FC = () => {
  const {dataTaskState} = useSelector(
    (state: RootState) => state.dataTaskState,
  );

  const {dataTaskIdsState} = useSelector(
    (state: RootState) => state.dataTaskIdsState,
  );

  const {dataTaskIdCurrentState} = useSelector(
    (state: RootState) => state.dataTaskIdCurrentState,
  );

  return (
    <ul>
      {dataTaskIdsState.map(id => {
        return (
          dataTaskState[id].categoryId === dataTaskIdCurrentState && (
            <li key={dataTaskState[id].id} className={style.task}>
              <Task {...dataTaskState[id]} />
            </li>
          )
        );
      })}
    </ul>
  );
};

export default TaskList;
