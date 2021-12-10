import React from 'react';
import {useSelector} from 'react-redux';
import {RootState} from 'ReduxStore/types/rootState';
import Category from './Category/Category';

interface Props {
  onClickCategory: (id: number) => void;
}

const CategoryList: React.FC<Props> = ({onClickCategory}) => {
  const {dataCategoryState} = useSelector(
    (state: RootState) => state.dataCategoryState,
  );
  const {dataIdsState} = useSelector((state: RootState) => state.dataIdsState);

  return (
    <ul>
      {dataIdsState.map(id => {
        return (
          dataCategoryState[id].parentId === null && (
            <Category
              key={id}
              id={id}
              category={dataCategoryState[id].category}
              listChild={dataCategoryState[id].children}
              onClickCategory={onClickCategory}
            />
          )
        );
      })}
    </ul>
  );
};

export default CategoryList;
