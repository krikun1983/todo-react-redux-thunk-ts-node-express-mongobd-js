import AuthContext from 'context/authContext';
import useDispatcher from 'hook/useDispatcher';
import React, {useContext, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from 'ReduxStore/types/rootState';
import Category from './Category';

const CategoryList: React.FC = () => {
  const {setAddDefaultCategoryAction} = useDispatcher();

  const {dataIdsState} = useSelector((state: RootState) => state.dataIdsState);
  const {dataCategoryState} = useSelector(
    (state: RootState) => state.dataCategoryState,
  );

  const auth = useContext(AuthContext);

  useEffect(() => {
    setAddDefaultCategoryAction(auth.token);
  }, []);

  return (
    <ul>
      {dataIdsState.map(id => {
        return (
          dataCategoryState[id].parentId === null && (
            <Category key={id} id={id} />
          )
        );
      })}
    </ul>
  );
};

export default CategoryList;
