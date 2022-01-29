import ConfirmModal from 'Components/ConfirmModal';
import AuthContext from 'context/authContext';
import useDispatcher from 'hook/useDispatcher';
import React, {useContext, useState} from 'react';
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {RootState} from 'ReduxStore/types/rootState';
import Category from './Category';

const CategoryList: React.FC = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const [delCategoryId, setDelCategoryId] = useState<string>('');
  const [isOpenFormDelCategory, setIsOpenFormDelCategory] =
    useState<boolean>(false);

  const {setDelCategoryAction, setDelTasksAction} = useDispatcher();

  const {dataIdsState} = useSelector((state: RootState) => state.dataIdsState);
  const {dataCategoryState} = useSelector(
    (state: RootState) => state.dataCategoryState,
  );

  const currentCategory = useSelector(
    (state: RootState) =>
      state.dataCategoryState.dataCategoryState[delCategoryId],
  );

  const handleOpenFormDelCategory = (id: string) => {
    setDelCategoryId(id);
    setIsOpenFormDelCategory(true);
  };

  const handleCloseFormDelCategory = () => {
    setIsOpenFormDelCategory(false);
  };

  const handleDelCategory = () => {
    setDelCategoryAction(auth.accessToken, {
      category: currentCategory.category,
      parentId: currentCategory.parentId,
      children: currentCategory.children,
      id: delCategoryId,
    });
    setDelTasksAction(auth.accessToken, {
      category: currentCategory.category,
      parentId: currentCategory.parentId,
      children: currentCategory.children,
      id: delCategoryId,
    });
    setIsOpenFormDelCategory(false);
    navigate('/');
  };

  return (
    <ul>
      {dataIdsState.map(id => {
        return (
          dataCategoryState[id].parentId === null && (
            <Category
              key={id}
              id={id}
              onOpenFormDelCategory={handleOpenFormDelCategory}
            />
          )
        );
      })}
      {isOpenFormDelCategory && (
        <ConfirmModal
          isOpenFormDelCategory={isOpenFormDelCategory}
          onDelCategory={handleDelCategory}
          onCloseForm={handleCloseFormDelCategory}
          onOpenFormDeleteCategory={setIsOpenFormDelCategory}
        />
      )}
    </ul>
  );
};

export default CategoryList;
