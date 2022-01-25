import React, {memo} from 'react';
import Category from '..';
import style from './CategoryChild.module.scss';

interface Prop {
  list: string[];
}

const CategoryChild: React.FC<Prop> = ({list}) => {
  return (
    <ul className={style.child}>
      {list.map(id => {
        return <Category key={id} id={id} />;
      })}
    </ul>
  );
};

export default memo(CategoryChild);
