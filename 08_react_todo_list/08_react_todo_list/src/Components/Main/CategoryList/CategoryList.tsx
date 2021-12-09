import React, {useState} from 'react';
import DATA_CATEGORIES, {DATA_IDS} from 'Redux/data/data-categories';
import Category from './Category/Category';

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
        return (
          categories[id - 1].parentId === null && (
            <Category
              key={id}
              id={id}
              category={categories[id - 1].category}
              listChild={categories[id - 1].children}
              onClickCategory={onClickCategory}
            />
          )
        );
      })}
    </ul>
  );
};

export default CategoryList;
