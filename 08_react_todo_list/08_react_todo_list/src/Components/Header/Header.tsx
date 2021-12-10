import React, {ChangeEvent, FormEvent, useState} from 'react';
import {Button, IconSVG, Input} from 'UI-Kit';
import {IconNameEnum} from 'UI-Kit/IconSVG/IconSVG';
import {InputNameEnum} from 'UI-Kit/Input/Input';
import style from './Header.module.scss';

const Header: React.FC = () => {
  const [checked, setChecked] = useState(true);
  const [valueSearch, setValueSearch] = useState('');
  const [valueCategory, setValueCategory] = useState('');
  const [valueTask, setValueTask] = useState('');

  const handleChecked = () => {
    setChecked(!checked);
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setValueSearch(text);
  };

  const handleCategory = (e: ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setValueCategory(text);
  };

  const handleTask = (e: ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setValueTask(text);
  };

  const handleSubmitCategory = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(valueCategory);
  };

  const handleSubmitTask = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(valueTask);
  };

  return (
    <header className={style.header}>
      <div className={style.header__top}>
        <h1>TO-DO List</h1>
        <div className={style.header__filter}>
          <Input
            id="checkbox"
            type="checkbox"
            checked={checked}
            onChange={handleChecked}
            styles={InputNameEnum.CHECKBOX}
          />
          <label htmlFor="checkbox">Show done</label>
          <span className={style.header__filter_btn}>
            <Input
              width="200px"
              height="25px"
              type="text"
              value={valueSearch}
              onChange={handleSearch}
              styles={InputNameEnum.TEXT}
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
            width="200px"
            height="25px"
            type="text"
            value={valueCategory}
            onChange={handleCategory}
            styles={InputNameEnum.TEXT}
            placeholder="Enter category title"
          />
          <Button styles="btn_blue" type="submit" text="add" />
        </form>
        <form onSubmit={handleSubmitTask} className={style.header__bottom_form}>
          <Input
            width="200px"
            height="25px"
            type="text"
            value={valueTask}
            onChange={handleTask}
            styles={InputNameEnum.TEXT}
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
