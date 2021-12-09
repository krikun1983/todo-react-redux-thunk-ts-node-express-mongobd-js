import React, {useState} from 'react';
import DATA_CATEGORIES from 'Redux/data/data-categories';
import style from './Category.module.scss';

interface CategoryProps {
  id: number;
  category: string;
  listChild: number[];
  onClickCategory: (id: number) => void;
}

interface CategoryType {
  category: string;
  parentId: number | null;
  children: number[];
  id: number;
}

const Category: React.FC<CategoryProps> = ({
  id,
  category,
  listChild,
  onClickCategory,
}) => {
  const [categories, setCategories] = useState<CategoryType[]>(DATA_CATEGORIES);
  const renderList = (list: number[]) => {
    return (
      <ul style={{marginLeft: '10px'}}>
        {list.map(idChildren => {
          return (
            <Category
              key={idChildren}
              id={idChildren}
              category={categories[idChildren - 1].category}
              listChild={categories[idChildren - 1].children}
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
