import AuthContext from 'context/authContext';
import useDispatcher from 'hook/useDispatcher';
import React, {useContext, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {useLocation, useParams, useSearchParams} from 'react-router-dom';
import {RootState} from 'ReduxStore/types/rootState';
import Task from './Task';
import style from './TaskList.module.scss';

const TaskList: React.FC = () => {
  const params = useParams();
  const location = useLocation();
  const [searchTask] = useSearchParams();
  const querySearch = searchTask.get('search');

  const {setAddDefaultTasksAction} = useDispatcher();

  const auth = useContext(AuthContext);

  const {dataTaskState} = useSelector(
    (state: RootState) => state.dataTaskState,
  );
  const {dataTaskIdsState} = useSelector(
    (state: RootState) => state.dataTaskIdsState,
  );
  const {isShowTasksDone} = useSelector(
    (state: RootState) => state.isShowTasksDone,
  );

  useEffect(() => {
    setAddDefaultTasksAction(auth.accessToken);
  }, []);

  let arrayIdsTask = [...dataTaskIdsState];

  if (!isShowTasksDone) {
    arrayIdsTask = [
      ...dataTaskIdsState.filter(id => dataTaskState[id].isDone === false),
    ];
  }

  if (querySearch) {
    arrayIdsTask = [
      ...arrayIdsTask.filter(id =>
        dataTaskState[id].title
          .toLowerCase()
          .includes(querySearch.toLowerCase()),
      ),
    ];
  }

  return (
    <ul>
      {location.pathname !== '/' &&
        arrayIdsTask.map(id => {
          return (
            dataTaskState[id].categoryId === params.id && (
              <li key={id} className={style.task}>
                <Task id={id} />
              </li>
            )
          );
        })}
    </ul>
  );
};

export default TaskList;
