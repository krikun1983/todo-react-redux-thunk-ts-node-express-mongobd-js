import React, {memo} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from 'ReduxStore/types/rootState';
import Category from '..';
import style from './CategoryChild.module.scss';

interface Prop {
  list: number[];
}

const CategoryChild: React.FC<Prop> = ({list}) => {
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
          />
        );
      })}
    </ul>
  );
};

export default memo(CategoryChild);
