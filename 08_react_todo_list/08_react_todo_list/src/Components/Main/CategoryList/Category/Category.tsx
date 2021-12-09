import React from 'react';
import useTypeSelector from 'ReduxStore/hooks/useTypeSelector';
import style from './Category.module.scss';

interface CategoryProps {
  id: number;
  category: string;
  listChild: number[];
  onClickCategory: (id: number) => void;
}

const Category: React.FC<CategoryProps> = ({
  id,
  category,
  listChild,
  onClickCategory,
}) => {
  const {dataCategoryState} = useTypeSelector(state => state.dataCategoryState);
  const renderList = (list: number[]) => {
    return (
      <ul style={{marginLeft: '10px'}}>
        {list.map(idChildren => {
          return (
            <Category
              key={idChildren}
              id={idChildren}
              category={dataCategoryState[idChildren - 1].category}
              listChild={dataCategoryState[idChildren - 1].children}
              onClickCategory={onClickCategory}
            />
          );
        })}
      </ul>
    );
  };

  return (
    <li>
      <div className={style.category} onClick={() => onClickCategory(id)}>
        <div className={style.category__name}>{category}</div>
        <div className={style.category__btns}>
          <button>Edit</button>
          <button>Delete</button>
          <button>Add Nested</button>
        </div>
      </div>
      {listChild.length > 0 && renderList(listChild)}
    </li>
  );
};

export default Category;
