import useDispatcher from 'hook/useDispatcher';
import React from 'react';
import {useSelector} from 'react-redux';
import {DataCategory} from 'ReduxStore/reducers/categoryState';
import {RootState} from 'ReduxStore/types/rootState';
import Category from './Category';

const CategoryList: React.FC = () => {
  const {setDelCategoryAction} = useDispatcher();

  const handleDelCategory = (currentCategory: DataCategory) => {
    setDelCategoryAction(currentCategory);
  };
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
              onDelCategory={handleDelCategory}
            />
          )
        );
      })}
    </ul>
  );
};

export default CategoryList;
