import React, {FormEvent, useState, ChangeEvent} from 'react';
import {useDispatch} from 'react-redux';
import {SearchActionTypes} from '../../../store/types/searchValue';
import UIButton from '../../../UI/UIButton';
import EnumUIButton from '../../../UI/UIButton/type/enum-ui-button';
import style from './SearchPanel.module.scss';

const SearchPanel: React.FC = () => {
  const dispatch = useDispatch();
  const [valueSearch, setValueSearch] = useState('');

  const handleSearchChangeFunc = (e: ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    const textValid = text;
    setValueSearch(textValid);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!valueSearch) {
      dispatch({type: SearchActionTypes.SEARCH, payload: ''});
      return;
    }
    dispatch({type: SearchActionTypes.SEARCH, payload: valueSearch.trim()});
    setValueSearch('');
  };

  return (
    <form className={style.form_search} onSubmit={handleSubmit}>
      <label htmlFor="search" className={style.form_search__label}>
        <input
          id="search"
          type="text"
          className={style.form_search__input}
          placeholder="search"
          value={valueSearch}
          onChange={handleSearchChangeFunc}
        />
      </label>
      <UIButton text="Search" type="submit" variant={EnumUIButton.search} />
    </form>
  );
};

export default SearchPanel;
