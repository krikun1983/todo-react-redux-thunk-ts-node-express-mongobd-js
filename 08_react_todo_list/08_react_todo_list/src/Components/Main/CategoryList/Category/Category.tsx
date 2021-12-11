import EditInput from 'Components/Main/EditInput/EditInput';
import React from 'react';
import {useDispatch} from 'react-redux';
import {updateCategoryAction} from 'ReduxStore/categoryAction/categoryAction';
import {Button, IconSVG} from 'UI-Kit';
import {IconNameEnum} from 'UI-Kit/IconSVG/IconSVG';
import validateInput from 'utils/validateInput';
import style from './Category.module.scss';
import CategoryChild from './CategoryChild/CategoryChild';

interface Props {
  id: number;
  category: string;
  parentId: number | null;
  listChild: number[];
  onClickCategory: (id: number) => void;
}

const Category: React.FC<Props> = ({
  id,
  category,
  parentId,
  listChild,
  onClickCategory,
}) => {
  const dispatch = useDispatch();
  const [childShow, setChildShow] = React.useState<boolean>(true);
  const [editCategory, setEditCategory] = React.useState<boolean>(false);
  const [valueEditCategory, setValueEditCategory] =
    React.useState<string>(category);
  const [errorEditCategory, setErrorEditCategory] =
    React.useState<boolean>(false);

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

  React.useEffect(() => {
    validateInput(valueEditCategory, setErrorEditCategory);
  }, [valueEditCategory]);

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
                  onClick={() => setChildShow(!childShow)}
                  icon={
                    <IconSVG
                      name={
                        childShow
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
            <EditInput
              height="30px"
              value={valueEditCategory}
              disabled={errorEditCategory}
              edit={editCategory}
              setEdit={setEditCategory}
              onEdit={handleEditCategory}
              onSubmit={handleEditCategorySubmit}
            />
          </>
        )}
      </div>
      {childShow && listChild.length > 0 && (
        <CategoryChild list={listChild} onClickCategory={onClickCategory} />
      )}
    </li>
  );
};

export default Category;
