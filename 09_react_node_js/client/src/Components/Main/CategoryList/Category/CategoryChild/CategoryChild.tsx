import React, {memo} from 'react';
import Category from '..';
import style from './CategoryChild.module.scss';

interface Prop {
  list: string[];
  onOpenFormDelCategory: (id: string) => void;
}

const CategoryChild: React.FC<Prop> = ({list, onOpenFormDelCategory}) => {
  return (
    <ul className={style.child}>
      {list.map(id => {
        return (
          <Category
            key={id}
            id={id}
            onOpenFormDelCategory={onOpenFormDelCategory}
          />
        );
      })}
    </ul>
  );
};

export default memo(CategoryChild);
