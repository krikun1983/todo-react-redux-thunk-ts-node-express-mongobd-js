import React from 'react';
import SearchPanel from './Search-panel';
import style from './Header.module.scss';

const Header: React.FC = () => {
  return (
    <header className={style.header}>
      <SearchPanel />
    </header>
  );
};

export default Header;
