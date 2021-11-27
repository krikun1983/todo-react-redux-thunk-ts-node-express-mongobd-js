import React from 'react';
import Header from 'components/Header';
import Main from 'components/Main';
import SpinnerLoader from 'components/SpinnerLoader';

const App: React.FC = () => {
  return (
    <div>
      <Header />
      <Main />
      <SpinnerLoader />
    </div>
  );
};

export default App;
