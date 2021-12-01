import React from 'react';
import Header from 'components/Header';
import Main from 'components/Main';
import Loader from 'components/Loader';

const App: React.FC = () => {
  return (
    <div>
      <Header />
      <Main />
      <Loader />
    </div>
  );
};

export default App;
