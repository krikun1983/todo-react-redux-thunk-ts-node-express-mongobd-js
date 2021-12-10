import React from 'react';
import {Header, Main} from 'Components';
import Loader from 'UI-Kit/Loader/Loader';

const App: React.FC = () => {
  return (
    <>
      <Header />
      <Main />
      <Loader />
    </>
  );
};

export default App;
