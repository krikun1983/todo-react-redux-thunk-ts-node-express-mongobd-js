import React, {useState} from 'react';
import DATA_CATEGORIES, {DATA_IDS} from 'Redux/data/data-categories';
import Category from './Category/Category';
import style from './CategoryList.module.scss';

interface CategoryListProps {
  onClickCategory: (id: number) => void;
}

interface CategoryType {
  category: string;
  parentId: number | null;
  children: number[];
  id: number;
}

const CategoryList: React.FC<CategoryListProps> = ({onClickCategory}) => {
  const [ids, setIds] = useState<number[]>(DATA_IDS);
  const [categories, setCategories] = useState<CategoryType[]>(DATA_CATEGORIES);

  return (
    <ul>
      {ids.map(id => {
        return categories[id - 1].parentId === null ? (
          categories[id - 1].children.length > 0 ? (
            <Category
              key={id}
              id={id}
              category={categories[id - 1].category}
              list={categories[id - 1].children}
              onClickCategory={onClickCategory}
              onClick={() => onClickCategory(id)}
            />
          ) : (
            <Category
              key={id}
              id={id}
              category={categories[id - 1].category}
              onClickCategory={onClickCategory}
              onClick={() => onClickCategory(id)}
            />
          )
        ) : null;
      })}
    </ul>
  );
};

export default CategoryList;
