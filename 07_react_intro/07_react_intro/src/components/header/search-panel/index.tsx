import React, { FormEvent } from 'react';
import style from './SearchPanel.module.scss';

const SearchPanel: React.FC = () => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Search');
  };

  return (
    <form className={style.form_search} onSubmit={handleSubmit}>
      <label htmlFor="search" className={style.form_search__label}>
        <input id="search" type="text" className={style.form_search__input} placeholder="search" />
      </label>
      <button className={style.form_search__btn} type="submit">
        Search
      </button>
    </form>
  );
};

export default SearchPanel;
