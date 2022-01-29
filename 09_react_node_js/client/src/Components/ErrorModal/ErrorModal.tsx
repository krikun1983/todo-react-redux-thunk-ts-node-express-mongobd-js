import React, {useEffect, useRef} from 'react';
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

  const modal = useRef() as React.MutableRefObject<HTMLDivElement>;

  useEffect(() => {
    modal.current.focus();

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.code === 'Escape') {
        handleCloseModal();
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    return () => document.removeEventListener('keydown', handleEscapeKey);
  }, []);

  return (
    <div className={rootClasses.join(' ')} onClick={handleCloseModal}>
      <div
        ref={modal}
        className={style.myModalContent}
        tabIndex={1}
        onClick={e => e.stopPropagation()}
        onBlur={() => modal.current.focus()}
      >
        {messageError}
      </div>
    </div>
  );
};

export default ErrorModal;
