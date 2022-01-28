import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {toggleErrorAction} from 'ReduxStore/reducers/errorState';
import {RootState} from 'ReduxStore/types/rootState';
import style from './ErrorModal.module.scss';

const ErrorModal: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {isErrorState} = useSelector((state: RootState) => state.isErrorState);
  const {messageError} = useSelector((state: RootState) => state.messageError);

  const rootClasses = [style.myModal];

  if (isErrorState) {
    rootClasses.push(style.active);
  }

  const handleCloseModal = () => {
    dispatch(
      toggleErrorAction({
        isErrorState: false,
        messageError: '',
      }),
    );
    navigate('/');
    window.location.reload();
  };

  return (
    <div className={rootClasses.join(' ')} onClick={handleCloseModal}>
      <div className={style.myModalContent} onClick={e => e.stopPropagation()}>
        {messageError}
      </div>
    </div>
  );
};

export default ErrorModal;
