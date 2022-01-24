import React from 'react';
import useAuth from 'hook/useAuth';
import {useRoutes} from 'router/routes';
import AuthContext from 'context/authContext';
import Navbar from 'Components/Header/Navbar';

const App: React.FC = () => {
  const {login, logout, accessToken, userId, userName} = useAuth();
  const isAuthenticated = !!accessToken;

  const routes = useRoutes(isAuthenticated);
  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        accessToken,
        userId,
        userName,
        isAuthenticated,
      }}
    >
      {isAuthenticated && <Navbar />}
      <>{routes}</>
    </AuthContext.Provider>
  );
};

export default App;
