import React from 'react';
import {useSelector} from 'react-redux';
import {DataCategory} from 'ReduxStore/reducers/categoryState';
import {RootState} from 'ReduxStore/types/rootState';
import Category from '../Category';
import style from './CategoryChild.module.scss';

interface Prop {
  list: number[];
  onClickCategory: (id: number) => void;
  onDelCategory: (currentCategory: DataCategory) => void;
}

const CategoryChild: React.FC<Prop> = ({
  list,
  onClickCategory,
  onDelCategory,
}) => {
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
            parentId={dataCategoryState[idChildren].parentId}
            category={dataCategoryState[idChildren].category}
            listChild={dataCategoryState[idChildren].children}
            onClickCategory={onClickCategory}
            onDelCategory={onDelCategory}
          />
        );
      })}
    </ul>
  );
};

export default CategoryChild;
