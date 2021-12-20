import React from 'react';
import {useDispatch} from 'react-redux';
import {delCategoryAction} from 'ReduxStore/actions/categoryAction';
import {DataCategory} from 'ReduxStore/reducers/categoryState';
import CategoryList from './CategoryList';
import TaskList from './TaskList';
import style from './Main.module.scss';

const Main: React.FC = () => {
  const dispatch = useDispatch();

  const handleDelCategory = (currentCategory: DataCategory) => {
    dispatch(delCategoryAction(currentCategory));
  };

  return (
    <main className={style.main}>
      <div className={style.main__categories}>
        <CategoryList onDelCategory={handleDelCategory} />
      </div>
      <div className={style.main__tasks}>
        <TaskList />
      </div>
    </main>
  );
};

export default Main;
