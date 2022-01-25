import React, {useEffect} from 'react';
import useAuth from 'hook/useAuth';
import {useRoutes} from 'router/routes';
import AuthContext from 'context/authContext';
import Navbar from 'Components/Header/Navbar';
import useDispatcher from 'hook/useDispatcher';

const App: React.FC = () => {
  const {login, logout, accessToken, userId, userName} = useAuth();
  const isAuthenticated = !!accessToken;

  const routes = useRoutes(isAuthenticated);
  const {setAddDefaultTasksAction, setAddDefaultCategoryAction} =
    useDispatcher();

  useEffect(() => {
    if (accessToken) {
      setAddDefaultTasksAction(accessToken);
      setAddDefaultCategoryAction(accessToken);
    }
  }, [accessToken]);

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
