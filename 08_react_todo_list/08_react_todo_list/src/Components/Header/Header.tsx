import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {addCategoryAction} from 'ReduxStore/actions/categoryAction';
import {addTaskAction} from 'ReduxStore/actions/taskAction';
import {searchNoteAction} from 'ReduxStore/reducers/searchReducer';
import {isShowDoneTasksAction} from 'ReduxStore/reducers/taskState';
import {RootState} from 'ReduxStore/types/rootState';
import {Button, IconSVG, Input} from 'UI-Kit';
import {IconNameEnum} from 'UI-Kit/IconSVG/IconSVG';
import maxIds from 'utils/maxIds';
import validateInput from 'utils/validateInput';
import style from './Header.module.scss';

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const {dataTaskState} = useSelector(
    (state: RootState) => state.dataTaskState,
  );
  const {dataIdsState} = useSelector((state: RootState) => state.dataIdsState);
  const {dataTaskIdsState} = useSelector(
    (state: RootState) => state.dataTaskIdsState,
  );
  const {dataTaskIdCurrentState} = useSelector(
    (state: RootState) => state.dataTaskIdCurrentState,
  );
  const {isShowTaskOfDone} = useSelector(
    (state: RootState) => state.isShowTaskOfDone,
  );
  const {searchTaskState} = useSelector(
    (state: RootState) => state.searchTaskState,
  );

  const [valueCategory, setValueCategory] = useState<string>('');
  const [valueTask, setValueTask] = useState<string>('');
  const [errorCategory, setErrorCategory] = useState<boolean>(false);
  const [errorTask, setErrorTask] = useState<boolean>(false);

  const handleChecked = () => {
    dispatch(isShowDoneTasksAction(isShowTaskOfDone));
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    dispatch(searchNoteAction(text.trim()));
  };

  const handleSearchReset = () => {
    dispatch(searchNoteAction(''));
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
    if (!errorTask && valueTask.trim().length && dataTaskIdCurrentState > 0) {
      dispatch(
        addTaskAction({
          title: valueTask,
          description: '',
          categoryId: dataTaskIdCurrentState,
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
      id => dataTaskState[id].categoryId === dataTaskIdCurrentState,
    ),
  ];
  const progressValue = [
    ...progressBar.filter(id => dataTaskState[id].isDone === true),
  ];

  return (
    <header className={style.header}>
      <div className={style.header__top}>
        <h1>TO-DO List</h1>
        <div className={style.header__filter}>
          <input
            id="checkbox"
            type="checkbox"
            checked={isShowTaskOfDone}
            onChange={handleChecked}
            className={style.checkbox}
          />
          <label htmlFor="checkbox">Show done</label>
          <span className={style.header__filter_btn}>
            <Input
              width="250px"
              height="25px"
              value={searchTaskState}
              onChange={handleSearch}
              placeholder="Search"
            />
            <Button
              styles="btn_icon_bg_white"
              type="button"
              onClick={handleSearchReset}
              icon={
                <IconSVG
                  name={IconNameEnum.CLOSE}
                  width="15"
                  height="20"
                  className="gray_blue_dark"
                />
              }
            />
          </span>
        </div>
      </div>
      <div className={style.header__medium}>
        <div className={style.progress}>
          <progress
            max={progressBar.length}
            value={progressValue.length}
          ></progress>
          <div className={style.progress__value}></div>
          <div className={style.progress__bg}>
            <div className={style.progress__bar}></div>
          </div>
        </div>
      </div>
      <div className={style.header__bottom}>
        <form
          onSubmit={handleSubmitCategory}
          className={style.header__bottom_form}
        >
          <Input
            width="240px"
            height="25px"
            value={valueCategory}
            onChange={handleCategory}
            placeholder="Enter category title"
          />
          <Button
            styles="btn_blue"
            type="submit"
            text="add"
            disabled={errorCategory}
          />
        </form>
        <form onSubmit={handleSubmitTask} className={style.header__bottom_form}>
          <Input
            width="240px"
            height="25px"
            value={valueTask}
            onChange={handleTask}
            placeholder="Text input with button"
          />
          <Button
            width="50px"
            height="25px"
            styles="btn_blue"
            type="submit"
            text="add"
          />
        </form>
      </div>
    </header>
  );
};

export default Header;
