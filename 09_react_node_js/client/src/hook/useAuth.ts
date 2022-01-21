import {useCallback, useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {clearCategoryOutput} from 'ReduxStore/reducers/categoryState';
import {clearTasksOutput} from 'ReduxStore/reducers/taskState';

const storageName = 'userData';

const useAuth = () => {
  const dispatch = useDispatch();
  const [token, setToken] = useState('');
  const [userId, setUserId] = useState('');
  const [userName, setUserName] = useState('');

  const login = useCallback((jwtToken, id, user) => {
    setToken(jwtToken);
    setUserId(id);
    setUserName(user);

    localStorage.setItem(
      storageName,
      JSON.stringify({
        userId: id,
        token: jwtToken,
        userName: user,
      }),
    );
  }, []);

  const logout = useCallback(() => {
    setToken('');
    setUserId('');
    setUserName('');
    dispatch(clearCategoryOutput());
    dispatch(clearTasksOutput());

    localStorage.removeItem(storageName);
  }, []);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName) as string);

    if (data && data.token) {
      login(data.token, data.userId, data.userName);
    }
  }, [login]);

  return {login, logout, token, userId, userName};
};

export default useAuth;
