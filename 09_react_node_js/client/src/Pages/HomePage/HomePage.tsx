import React from 'react';
import Header from 'Components/Header';
import Main from 'Components/Main';
import {Loader} from 'UI-Kit';

const HomePage: React.FC = () => {
  return (
    <>
      <Header />
      <Main />
      <Loader />
    </>
  );
};

export default HomePage;
