import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {addCategoryAction} from 'ReduxStore/categoryAction/categoryAction';
import {RootState} from 'ReduxStore/types/rootState';
import {Button, IconSVG, Input} from 'UI-Kit';
import {IconNameEnum} from 'UI-Kit/IconSVG/IconSVG';
import maxIds from 'utils/maxIds';
import validateInput from 'utils/validateInput';
import style from './Header.module.scss';

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const {dataIdsState} = useSelector((state: RootState) => state.dataIdsState);
  const [checked, setChecked] = useState<boolean>(true);
  const [valueSearch, setValueSearch] = useState<string>('');
  const [valueCategory, setValueCategory] = useState<string>('');
  const [valueTask, setValueTask] = useState<string>('');
  const [errorCategory, setErrorCategory] = useState<boolean>(false);

  const handleChecked = () => {
    setChecked(!checked);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setValueSearch(text);
  };

  const resetForm = (): void => {
    setValueCategory('');
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
    resetForm();
  };

  useEffect(() => {
    validateInput(valueCategory, setErrorCategory);
  }, [valueCategory]);

  const handleTask = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setValueTask(text);
  };

  const handleSubmitTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(valueTask);
  };

  return (
    <header className={style.header}>
      <div className={style.header__top}>
        <h1>TO-DO List</h1>
        <div className={style.header__filter}>
          <input
            id="checkbox"
            type="checkbox"
            checked={checked}
            onChange={handleChecked}
            className={style.checkbox}
          />
          <label htmlFor="checkbox">Show done</label>
          <span className={style.header__filter_btn}>
            <Input
              width="250px"
              height="25px"
              value={valueSearch}
              onChange={handleSearch}
              placeholder="Search"
            />
            <Button
              styles="btn_icon_bg_white"
              type="button"
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
        <input type="range" />
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
