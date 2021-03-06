import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {useSelector} from 'react-redux';
import {Link, useLocation, useParams} from 'react-router-dom';
import {useSearchParams} from 'react-router-dom';
import {RootState} from 'ReduxStore/types/rootState';
import {Button, IconSVG, IconNameEnum, MyInput} from 'UI-Kit';
import validateInput from 'utils/validateInput';
import cn from 'classnames';
import style from './Header.module.scss';
import useDispatcher from 'hook/useDispatcher';
import AuthContext from 'context/authContext';

const Header: React.FC = () => {
  const {setShowDoneTasksAction, setAddCategoryAction, setAddTaskAction} =
    useDispatcher();

  const params = useParams();

  const {dataTaskState} = useSelector(
    (state: RootState) => state.dataTaskState,
  );

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

  const searchTask = useSearchParams();

  const location = useLocation();

  const auth = useContext(AuthContext);

  const handleChecked = () => {
    setShowDoneTasksAction(isShowTasksDone);
  };

  const debounce = (
    callback: (e: React.ChangeEvent<HTMLInputElement>) => void,
    ms: number,
  ) => {
    let timer: NodeJS.Timeout;
    return (...args: React.ChangeEvent<HTMLInputElement>[]) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        callback(args[0]);
      }, ms);
    };
  };

  const inputSearch = useRef() as React.MutableRefObject<HTMLInputElement>;

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    if (text.trim()) {
      searchTask[1]({search: text.trim()});
    } else {
      searchTask[1]({});
    }
  };

  const handleSearchReset = () => {
    searchTask[1]({});
    inputSearch.current.value = '';
  };

  const handleCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setValueCategory(text);
  };

  const handleSubmitCategory = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!errorCategory && valueCategory.trim().length) {
        setAddCategoryAction(auth.accessToken, {
          category: valueCategory,
          parentId: null,
          children: [],
        });
      }
      setValueCategory('');
    },
    [valueCategory],
  );

  const handleTask = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setValueTask(text);
  };

  const handleSubmitTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!errorTask && valueTask.trim().length && params.id !== '') {
      setAddTaskAction(auth.accessToken, {
        title: valueTask,
        description: '',
        categoryId: params.id as string,
        isDone: false,
      });
    }
    setValueTask('');
  };

  useEffect(() => {
    validateInput(valueCategory, setErrorCategory);
    validateInput(valueTask, setErrorTask);
  }, [valueCategory, valueTask]);

  const progressBar = [
    ...dataTaskIdsState.filter(
      id => dataTaskState[id].categoryId === params.id,
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
            <MyInput
              type="text"
              ref={inputSearch}
              onChange={debounce(handleSearch, 350)}
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
