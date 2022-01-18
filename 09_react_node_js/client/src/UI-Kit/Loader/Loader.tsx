import React from 'react';
import {useSelector} from 'react-redux';
import {RootState} from 'ReduxStore/types/rootState';
import style from './Loader.module.scss';

const Loader: React.FC = () => {
  const {isLoaderState} = useSelector(
    (state: RootState) => state.isLoaderState,
  );

  return (
    <>
      {isLoaderState && (
        <div className={style.spinner__container}>
          <div
            className={style.spinner__wrapper}
            style={{width: '180px', height: '180px'}}
          >
            <div className={style.lds_roller}>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Loader;
