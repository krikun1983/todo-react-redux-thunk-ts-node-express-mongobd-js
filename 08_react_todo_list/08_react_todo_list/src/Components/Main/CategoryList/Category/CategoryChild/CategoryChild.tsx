import React from 'react';
import {useSelector} from 'react-redux';
import {RootState} from 'ReduxStore/types/rootState';
import Category from '../Category';
import style from './CategoryChild.module.scss';

interface Prop {
  list: number[];
  onClickCategory: (id: number) => void;
}

const CategoryChild: React.FC<Prop> = ({list, onClickCategory}) => {
  const {dataCategoryState} = useSelector(
    (state: RootState) => state.dataCategoryState,
  );

  return (
    <ul className={style.child}>
      {list.map(idChildren => {
        return (
          <Category
            key={idChildren}
            id={idChildren}
            category={dataCategoryState[idChildren].category}
            listChild={dataCategoryState[idChildren].children}
            onClickCategory={onClickCategory}
          />
        );
      })}
    </ul>
  );
};

export default CategoryChild;
