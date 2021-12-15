import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  addChildAction,
  updateCategoryAction,
} from 'ReduxStore/actions/categoryAction';
import FieldFormInput from 'Components/Main/FieldFormInput/FieldFormInput';
import CategoryChild from './CategoryChild/CategoryChild';
import {Button, IconSVG} from 'UI-Kit';
import {IconNameEnum} from 'UI-Kit/IconSVG/IconSVG';
import validateInput from 'utils/validateInput';
import style from './Category.module.scss';
import {RootState} from 'ReduxStore/types/rootState';
import maxIds from 'utils/maxIds';
import {DataCategory} from 'ReduxStore/reducers/categoryState';

interface Props {
  id: number;
  category: string;
  parentId: number | null;
  listChild: number[];
  onClickCategory: (id: number) => void;
  onDelCategory: (currentCategory: DataCategory) => void;
}

const Category: React.FC<Props> = ({
  id,
  category,
  parentId,
  listChild,
  onClickCategory,
  onDelCategory,
}) => {
  const dispatch = useDispatch();
  const {dataIdsState} = useSelector((state: RootState) => state.dataIdsState);

  const [showChildren, setShowChildren] = useState<boolean>(true);

  const [addChild, setAddChild] = useState<boolean>(false);
  const [valueAddChild, setValueAddChild] = useState<string>('');
  const [errorAddChild, setErrorAddChild] = useState<boolean>(false);

  const [editCategory, setEditCategory] = useState<boolean>(false);
  const [valueEditCategory, setValueEditCategory] = useState<string>(category);
  const [errorEditCategory, setErrorEditCategory] = useState<boolean>(false);

  const handleAddChild = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nameNewChild = e.target.value;
    setValueAddChild(nameNewChild);
  };

  const handleAddChildSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAddChild(false);
    if (!errorAddChild && valueAddChild.trim().length) {
      dispatch(
        addChildAction({
          category: valueAddChild,
          parentId: id,
          children: [],
          id: maxIds(dataIdsState),
        }),
      );
      setValueAddChild('');
    }
  };

  const handleEditCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nameCategory = e.target.value;
    setValueEditCategory(nameCategory);
  };

  const handleEditCategorySubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEditCategory(false);
    if (!errorEditCategory && valueEditCategory.trim().length) {
      dispatch(
        updateCategoryAction({
          category: valueEditCategory,
          parentId: parentId,
          children: listChild,
          id,
        }),
      );
    }
  };

  useEffect(() => {
    validateInput(valueEditCategory, setErrorEditCategory);
    validateInput(valueAddChild, setErrorAddChild);
  }, [valueEditCategory, valueAddChild]);

  const handleDelCategory = () => {
    onDelCategory({
      category,
      parentId,
      children: listChild,
      id,
    });
  };

  return (
    <li>
      <div className={style.category}>
        {!editCategory ? (
          <>
            <div className={style.category__btn_child}>
              {listChild.length > 0 && (
                <Button
                  styles="btn_icon_bg_white"
                  type="button"
                  onClick={() => setShowChildren(!showChildren)}
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
            <div
              className={style.category__name}
              onClick={() => onClickCategory(id)}
            >
              {category}
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
                onClick={handleDelCategory}
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
          </>
        ) : (
          <>
            <FieldFormInput
              height="30px"
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
            height="30px"
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
      {showChildren && listChild.length > 0 && (
        <CategoryChild
          list={listChild}
          onClickCategory={onClickCategory}
          onDelCategory={onDelCategory}
        />
      )}
    </li>
  );
};

export default Category;
