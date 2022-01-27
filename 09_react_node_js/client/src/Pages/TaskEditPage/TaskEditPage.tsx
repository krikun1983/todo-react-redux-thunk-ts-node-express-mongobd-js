import React, {useContext, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {useNavigate, useParams} from 'react-router-dom';
import {RootState} from 'ReduxStore/types/rootState';
import {Button, IconSVG, IconNameEnum} from 'UI-Kit';
import {DataTask} from 'ReduxStore/reducers/taskState';
import validateInput from 'utils/validateInput';
import cn from 'classnames';
import style from './TaskEditPage.module.scss';
import useDispatcher from 'hook/useDispatcher';
import AuthContext from 'context/authContext';

const TaskEditPage: React.FC = () => {
  const params = useParams();
  const navigate = useNavigate();

  const {setUpdateTaskAction} = useDispatcher();

  const {dataTaskState} = useSelector(
    (state: RootState) => state.dataTaskState,
  );
  const {dataIdsState} = useSelector((state: RootState) => state.dataIdsState);
  const {dataCategoryState} = useSelector(
    (state: RootState) => state.dataCategoryState,
  );

  const auth = useContext(AuthContext);

  const taskCurrent = dataTaskState[params.id as string];

  const [valueTask, setValueTask] = useState<DataTask>(taskCurrent);
  const [errorTaskTitle, setErrorTaskTitle] = useState<boolean>(false);

  const handleTaskMove = (choiceIdCategory: string) => {
    setValueTask(prev => ({...prev, categoryId: choiceIdCategory}));
  };

  const handleTaskChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isCheck = e.target.checked;
    setValueTask(prev => ({...prev, isDone: isCheck}));
  };

  const handleTaskTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    if (title.trim().length > 40) return;
    setValueTask(prev => ({...prev, title: title}));
  };

  const handleTaskDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const description = e.target.value;
    setValueTask(prev => ({...prev, description: description}));
  };

  useEffect(() => {
    validateInput(valueTask.title, setErrorTaskTitle);
  }, [valueTask.title]);

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!errorTaskTitle && valueTask.title.trim().length) {
      setUpdateTaskAction(auth.accessToken, {
        title: valueTask.title,
        description: valueTask.description.trim(),
        categoryId: valueTask.categoryId,
        isDone: valueTask.isDone,
        id: valueTask.id,
      });
      navigate(`/categories/${params.categoryId}`);
    }
  };

  const handleSubmitFormChancel = () => {
    navigate(`/categories/${params.categoryId}`);
  };

  return (
    <form onSubmit={handleSubmitForm}>
      <div className={style.edit}>
        <h1 className={style.edit__heading}>{valueTask.title}</h1>
        <div className={style.edit__wrapper}>
          <div className={style.edit__categories}>
            {dataIdsState.map(ids => {
              return (
                <div
                  key={ids}
                  className={cn(
                    style.edit__categories_item,
                    dataCategoryState[ids].id === valueTask.categoryId &&
                      style.edit__categories_item_active,
                  )}
                >
                  <h3 className={style.edit__categories_item_name}>
                    {dataCategoryState[ids].category}
                  </h3>
                  <Button
                    styles="btn_icon_bg_white"
                    type="button"
                    onClick={() => handleTaskMove(dataCategoryState[ids].id)}
                    icon={
                      <IconSVG
                        name={IconNameEnum.CHOICE}
                        width="26"
                        height="26"
                        className={
                          dataCategoryState[ids].id === valueTask.categoryId
                            ? 'blue_dark_gray'
                            : 'gray_blue_dark'
                        }
                      />
                    }
                  />
                </div>
              );
            })}
          </div>
          <div className={style.edit__task}>
            <div className={style.edit__task_btns_wrapper}>
              <div className={style.edit__task_btns}>
                <Button
                  styles="btn_blue"
                  type="submit"
                  text="Save change"
                  disabled={errorTaskTitle}
                />
                <Button
                  styles="btn_gray"
                  type="button"
                  text="Chancel"
                  onClick={handleSubmitFormChancel}
                />
              </div>
            </div>
            <div className={style.edit__task_input}>
              <input value={valueTask.title} onChange={handleTaskTitle} />
            </div>
            <div className={style.edit__task_check}>
              <input
                id="checkboxEdit"
                type="checkbox"
                className={style.checkbox_edit}
                checked={valueTask.isDone}
                onChange={handleTaskChecked}
              />
              <label htmlFor="checkboxEdit">Show done</label>
            </div>
            <textarea
              className={cn(style.edit__task__description)}
              value={valueTask.description}
              onChange={handleTaskDescription}
              placeholder="category text"
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default TaskEditPage;
