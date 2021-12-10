import React, {useState} from 'react';
import useTypeSelector from 'ReduxStore/hooks/useTypeSelector';
import {Button, IconSVG} from 'UI-Kit';
import {IconNameEnum} from 'UI-Kit/IconSVG/IconSVG';
import style from './Category.module.scss';

interface CategoryProps {
  id: number;
  category: string;
  listChild: number[];
  onClickCategory: (id: number) => void;
}

const Category: React.FC<CategoryProps> = ({
  id,
  category,
  listChild,
  onClickCategory,
}) => {
  const {dataCategoryState} = useTypeSelector(state => state.dataCategoryState);
  const [childShow, setChildShow] = useState<boolean>(true);

  const renderList = (list: number[]) => {
    return (
      <ul className={style.child}>
        {list.map(idChildren => {
          return (
            <Category
              key={idChildren}
              id={idChildren}
              category={dataCategoryState[idChildren].category}
              listChild={dataCategoryState[idChildren].children}
              onClickCategory={onClickCategory}
            />
          );
        })}
      </ul>
    );
  };

  return (
    <li>
      <div className={style.category}>
        <div className={style.category__btn_edit}>
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
            styles="btn_icon_bg_white"
            type="button"
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
      </div>
      {childShow && listChild.length > 0 && renderList(listChild)}
    </li>
  );
};

export default Category;
