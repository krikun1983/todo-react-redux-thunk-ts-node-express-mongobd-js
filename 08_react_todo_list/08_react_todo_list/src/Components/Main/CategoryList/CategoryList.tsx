import React from 'react';
import {useSelector} from 'react-redux';
import {DataCategory} from 'ReduxStore/reducers/categoryState';
import {RootState} from 'ReduxStore/types/rootState';
import Category from './Category/Category';

interface Props {
  onClickCategory: (id: number) => void;
  onDelCategory: (currentCategory: DataCategory) => void;
}

const CategoryList: React.FC<Props> = ({onClickCategory, onDelCategory}) => {
  const {dataIdsState} = useSelector((state: RootState) => state.dataIdsState);
  const {dataCategoryState} = useSelector(
    (state: RootState) => state.dataCategoryState,
  );

  return (
    <ul>
      {dataIdsState.map(id => {
        return (
          dataCategoryState[id].parentId === null && (
            <Category
              key={id}
              id={id}
              parentId={dataCategoryState[id].parentId}
              category={dataCategoryState[id].category}
              listChild={dataCategoryState[id].children}
              onClickCategory={onClickCategory}
              onDelCategory={onDelCategory}
            />
          )
        );
      })}
    </ul>
  );
};

export default CategoryList;
