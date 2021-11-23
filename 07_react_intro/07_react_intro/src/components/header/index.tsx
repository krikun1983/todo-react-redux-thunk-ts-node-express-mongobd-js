import React from 'react';
import style from './Header.module.scss';
import SearchPanel from './search-panel';

const Header: React.FC = () => {
  return (
    <header className={style.header}>
      <SearchPanel />
    </header>
  );
};

export default Header;
