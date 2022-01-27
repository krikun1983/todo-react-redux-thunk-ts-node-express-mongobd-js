import React, {useCallback, useContext, useEffect, useState} from 'react';
import {NavLink, useNavigate, useSearchParams} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {RootState} from 'ReduxStore/types/rootState';
import {Button, IconNameEnum, IconSVG} from 'UI-Kit';
import validateInput from 'utils/validateInput';
import FieldFormInput from 'Components/Main/FieldFormInput';
import CategoryChild from './CategoryChild';
import ConfirmModal from 'Components/ConfirmModal';
import style from './Category.module.scss';
import useDispatcher from 'hook/useDispatcher';
import AuthContext from 'context/authContext';

interface Props {
  id: string;
}

const Category: React.FC<Props> = ({id}) => {
  const {setAddChildAction, setUpdateCategoryAction, setDelCategoryAction} =
    useDispatcher();

  const currentCategory = useSelector(
    (state: RootState) => state.dataCategoryState.dataCategoryState[id],
  );

  const [searchTask] = useSearchParams();
  const querySearch = searchTask.get('search');
  const navigate = useNavigate();

  const [showChildren, setShowChildren] = useState<boolean>(true);

  const [addChild, setAddChild] = useState<boolean>(false);
  const [valueAddChild, setValueAddChild] = useState<string>('');
  const [errorAddChild, setErrorAddChild] = useState<boolean>(false);

  const [editCategory, setEditCategory] = useState<boolean>(false);
  const [valueEditCategory, setValueEditCategory] = useState<string>(
    currentCategory.category,
  );
  const [errorEditCategory, setErrorEditCategory] = useState<boolean>(false);
  const [isOpenFormDelCategory, setIsOpenFormDelCategory] =
    useState<boolean>(false);

  const auth = useContext(AuthContext);

  const handleShowChildren = () => {
    setShowChildren(!showChildren);
  };

  const handleAddChild = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nameNewChild = e.target.value;
    setValueAddChild(nameNewChild);
  };

  const handleAddChildSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setAddChild(false);
      if (!errorAddChild && valueAddChild.trim().length) {
        setAddChildAction(auth.accessToken, {
          category: valueAddChild,
          parentId: id,
          children: [],
        });
        setValueAddChild('');
      }
    },
    [valueAddChild],
  );

  const handleEditCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nameCategory = e.target.value;
    setValueEditCategory(nameCategory);
  };

  const handleEditCategorySubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setEditCategory(false);

      if (!errorEditCategory && valueEditCategory.trim().length) {
        setUpdateCategoryAction(auth.accessToken, {
          category: valueEditCategory,
          parentId: currentCategory.parentId,
          children: currentCategory.children,
          id,
        });
      }
    },
    [valueEditCategory],
  );

  useEffect(() => {
    validateInput(valueEditCategory, setErrorEditCategory);
    validateInput(valueAddChild, setErrorAddChild);
  }, [valueEditCategory, valueAddChild]);

  const handleOpenFormDelCategory = () => {
    setIsOpenFormDelCategory(true);
  };

  const handleCloseFormDelCategory = () => {
    setIsOpenFormDelCategory(false);
  };

  const handleDelCategory = useCallback(() => {
    setDelCategoryAction(auth.accessToken, {
      category: currentCategory.category,
      parentId: currentCategory.parentId,
      children: currentCategory.children,
      id,
    });
    navigate('/');
  }, [setDelCategoryAction]);

  return (
    <li>
      <div className={style.category}>
        {!editCategory ? (
          <>
            <NavLink
              to={
                querySearch
                  ? `/categories/${id}?search=${querySearch}`
                  : `/categories/${id}`
              }
              className={style.category__link}
            >
              <div className={style.category__btn_child}>
                {currentCategory.children.length > 0 && (
                  <Button
                    styles="btn_icon_bg_white"
                    type="button"
                    onClick={handleShowChildren}
                    icon={
                      <IconSVG
                        name={
                          showChildren
                            ? IconNameEnum.ARROW_TOP
                            : IconNameEnum.ARROW_BOTTOM
                        }
                        width="15"
                        height="20"
                        className="blue_dark_gray"
                      />
                    }
                  />
                )}
              </div>
              <div className={style.category__name}>
                {currentCategory.category}
              </div>
              <div className={style.category__btns}>
                <Button
                  title="Edit name category"
                  styles="btn_icon_bg_white"
                  type="button"
                  onClick={() => setEditCategory(true)}
                  icon={
                    <IconSVG
                      name={IconNameEnum.EDIT}
                      width="30"
                      height="30"
                      className="blue_dark_gray"
                    />
                  }
                />
                <Button
                  styles="btn_icon_bg_white"
                  type="button"
                  onClick={handleOpenFormDelCategory}
                  icon={
                    <IconSVG
                      name={IconNameEnum.BASKET}
                      width="26"
                      height="26"
                      className="blue_dark_gray"
                    />
                  }
                />
                <Button
                  styles="btn_icon_bg_white"
                  type="button"
                  onClick={() => setAddChild(true)}
                  icon={
                    <IconSVG
                      name={IconNameEnum.PLUS}
                      width="26"
                      height="26"
                      className="blue_dark_gray"
                    />
                  }
                />
              </div>
            </NavLink>
          </>
        ) : (
          <>
            <FieldFormInput
              value={valueEditCategory}
              btnName="Edit"
              disabled={errorEditCategory}
              edit={editCategory}
              setEdit={setEditCategory}
              onEdit={handleEditCategory}
              onSubmit={handleEditCategorySubmit}
            />
          </>
        )}
      </div>
      {addChild && (
        <>
          <FieldFormInput
            value={valueAddChild}
            btnName="Add"
            disabled={errorAddChild}
            edit={addChild}
            setEdit={setAddChild}
            onEdit={handleAddChild}
            onSubmit={handleAddChildSubmit}
          />
        </>
      )}
      {showChildren && currentCategory.children.length > 0 && (
        <CategoryChild list={currentCategory.children} />
      )}
      {isOpenFormDelCategory && (
        <ConfirmModal
          isOpenFormDelCategory={isOpenFormDelCategory}
          onDelCategory={handleDelCategory}
          onCloseForm={handleCloseFormDelCategory}
          onOpenFormDeleteCategory={setIsOpenFormDelCategory}
        />
      )}
    </li>
  );
};

export default Category;
