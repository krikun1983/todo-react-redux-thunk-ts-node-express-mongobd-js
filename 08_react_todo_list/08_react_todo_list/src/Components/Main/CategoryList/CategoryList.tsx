import React from 'react';
import useTypeSelector from 'ReduxStore/hooks/useTypeSelector';
import Category from './Category/Category';

interface CategoryListProps {
  onClickCategory: (id: number) => void;
}

const CategoryList: React.FC<CategoryListProps> = ({onClickCategory}) => {
  const {dataCategoryState} = useTypeSelector(state => state.dataCategoryState);
  const {dataIdsState} = useTypeSelector(state => state.dataIdsState);

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
