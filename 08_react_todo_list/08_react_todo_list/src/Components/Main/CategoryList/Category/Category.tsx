import React from 'react';
import DATA_CATEGORIES from 'Redux/data/data-categories';

interface CategoryProps {
  id: number;
  category: string;
  list?: number[];
  onClick: (id: number) => void;
  onClickCategory: (id: number) => void;
}

interface CategoryType {
  category: string;
  parentId: null | number;
  children: null | CategoryType;
  id: number;
}
// const subCategoryCur: CategoryType[] = [];

// const nest = (
//   items: CategoryType[],
//   id: number | null | undefined = null,
// ): unknown =>
//   items
//     .filter((item: CategoryType) => item.parentId === id)
//     .map((item: CategoryType) => ({
//       ...item,
//       children: nest(items, item.id),
//     }));

// const categoryMap = nest(DATA_CATEGORIES);
// console.log(categoryMap);

const Category: React.FC<CategoryProps> = ({
  id,
  category,
  list,
  onClickCategory,
}): JSX.Element => {
  // return (
  //   <>
  //     {DATA_CATEGORIES.map(elem => {
  //       return (
  //         <React.Fragment key={uuid()}>
  //           {elem.category === category ? <p>{elem.category}</p> : null}
  //           {elem.parentId === id ? <p>{elem.category}</p> : null}
  //         </React.Fragment>
  //       );
  //     })}
  //   </>
  // );

  const renderInnerList = (listChildren: number[] | undefined) => {
    return (
      <ul style={{marginLeft: '10px'}}>
        {listChildren?.map(idChildren => {
          return DATA_CATEGORIES[idChildren - 1].children.length > 0 ? (
            <Category
              key={idChildren}
              id={idChildren}
              category={DATA_CATEGORIES[idChildren - 1].category}
              list={DATA_CATEGORIES[idChildren - 1].children}
              onClickCategory={onClickCategory}
              onClick={() => onClickCategory(id)}
            />
          ) : (
            <Category
              key={idChildren}
              id={idChildren}
              category={DATA_CATEGORIES[idChildren - 1].category}
              list={DATA_CATEGORIES[idChildren - 1].children}
              onClickCategory={onClickCategory}
              onClick={() => onClickCategory(id)}
            />
          );
        })}
      </ul>
    );
  };

  return (
    <li>
      {category}
      {renderInnerList(list)}
    </li>
  );
};

export default Category;
