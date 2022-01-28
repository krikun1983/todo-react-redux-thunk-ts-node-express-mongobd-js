import React from 'react';
import Header from 'Components/Header';
import Main from 'Components/Main';
import {Loader} from 'UI-Kit';
import ErrorModal from 'Components/ErrorModal';

const HomePage: React.FC = () => {
  return (
    <>
      <Header />
      <Main />
      <Loader />
      <ErrorModal />
    </>
  );
};

export default HomePage;
