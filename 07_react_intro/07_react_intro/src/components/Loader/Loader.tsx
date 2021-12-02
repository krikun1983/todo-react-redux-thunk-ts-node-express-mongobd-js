import React, {useState} from 'react';
import store from 'store';
import {RootState} from 'store/types/rootState';
import style from './Loader.module.scss';

const Loader: React.FC = () => {
  const [stateOfStore, setStateOfStore] = useState<RootState>(store.getState());

  store.subscribe(() => {
    setStateOfStore(store.getState());
  });

  const {isLoaderState} = stateOfStore.isLoaderState;

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
