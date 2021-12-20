import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link, useLocation, useParams} from 'react-router-dom';
import {useSearchParams} from 'react-router-dom';
import {addCategoryAction} from 'ReduxStore/actions/categoryAction';
import {addTaskAction} from 'ReduxStore/actions/taskAction';
import {isShowDoneTasksAction} from 'ReduxStore/reducers/taskState';
import {RootState} from 'ReduxStore/types/rootState';
import {Button, IconSVG, IconNameEnum} from 'UI-Kit';
import maxIds from 'utils/maxIds';
import validateInput from 'utils/validateInput';
import cn from 'classnames';
import style from './Header.module.scss';

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const params = useParams();

  const {dataTaskState} = useSelector(
    (state: RootState) => state.dataTaskState,
  );
  const {dataIdsState} = useSelector((state: RootState) => state.dataIdsState);
  const {dataTaskIdsState} = useSelector(
    (state: RootState) => state.dataTaskIdsState,
  );
  const {isShowTasksDone} = useSelector(
    (state: RootState) => state.isShowTasksDone,
  );

  const [valueCategory, setValueCategory] = useState<string>('');
  const [valueTask, setValueTask] = useState<string>('');
  const [errorCategory, setErrorCategory] = useState<boolean>(false);
  const [errorTask, setErrorTask] = useState<boolean>(false);

  const [searchTask, setSearchTask] = useSearchParams();
  const querySearch = searchTask.get('search');

  const location = useLocation();

  const handleChecked = () => {
    dispatch(isShowDoneTasksAction(isShowTasksDone));
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    if (text.trim()) {
      setSearchTask({search: text.trim()});
    } else {
      setSearchTask({});
    }
  };

  const handleSearchReset = () => {
    setSearchTask({});
  };

  const handleCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    if (text.length > 26) return;
    setValueCategory(text);
  };

  const handleSubmitCategory = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!errorCategory && valueCategory.trim().length) {
      dispatch(
        addCategoryAction({
          category: valueCategory,
          parentId: null,
          children: [],
          id: maxIds(dataIdsState),
        }),
      );
    }
    setValueCategory('');
  };

  const handleTask = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    if (text.length > 30) return;
    setValueTask(text);
  };

  const handleSubmitTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!errorTask && valueTask.trim().length && +(params.id as string) > 0) {
      dispatch(
        addTaskAction({
          title: valueTask,
          description: '',
          categoryId: +(params.id as string),
          isDone: false,
          id: maxIds(dataTaskIdsState),
        }),
      );
    }
    setValueTask('');
  };

  useEffect(() => {
    validateInput(valueCategory, setErrorCategory);
    validateInput(valueTask, setErrorTask);
  }, [valueCategory, valueTask]);

  const progressBar = [
    ...dataTaskIdsState.filter(
      id => dataTaskState[id].categoryId === +(params.id as string),
    ),
  ];
  const progressValue = [
    ...progressBar.filter(id => dataTaskState[id].isDone === true),
  ];

  return (
    <header className={style.header}>
      <div className={style.header__top}>
        <h1>
          <Link to="/" title="Home">
            TO-DO List
          </Link>
        </h1>
        <div
          className={cn(
            style.header__filter,
            location.pathname === '/' && style.end,
          )}
        >
          {location.pathname !== '/' && (
            <>
              <input
                id="checkbox"
                type="checkbox"
                checked={isShowTasksDone}
                onChange={handleChecked}
                className={style.checkbox}
              />
              <label htmlFor="checkbox">Show done</label>
            </>
          )}
          <span className={style.header__filter_btn}>
            <input
              style={{width: '250px', height: '25px', paddingLeft: '5px'}}
              type="text"
              value={typeof querySearch === 'string' ? querySearch : ''}
              onChange={handleSearch}
              placeholder="Search"
              disabled={location.pathname === '/'}
            />
            <Button
              styles="btn_icon_bg_white"
              type="button"
              onClick={handleSearchReset}
              disabled={location.pathname === '/'}
              icon={
                <IconSVG
                  name={IconNameEnum.CLOSE}
                  width="15"
                  height="20"
                  className={
                    location.pathname === '/'
                      ? 'gray_blue_dark_disabled'
                      : 'gray_blue_dark'
                  }
                />
              }
            />
          </span>
        </div>
      </div>
      <div className={style.header__medium}>
        <progress
          max={progressBar.length}
          value={progressValue.length}
        ></progress>
      </div>
      <div className={style.header__bottom}>
        <form
          onSubmit={handleSubmitCategory}
          className={style.header__bottom_form}
        >
          <input
            className={style.header__bottom_form_input}
            value={valueCategory}
            onChange={handleCategory}
            placeholder="Enter category title"
          />
          <Button styles="btn_blue" type="submit" text="Add" />
        </form>
        <form onSubmit={handleSubmitTask} className={style.header__bottom_form}>
          <input
            className={style.header__bottom_form_input}
            value={valueTask}
            onChange={handleTask}
            placeholder="Enter task title"
            disabled={location.pathname === '/'}
          />
          <Button
            styles="btn_blue"
            type="submit"
            text="Add"
            disabled={location.pathname === '/'}
          />
        </form>
      </div>
    </header>
  );
};

export default Header;
