import {useCallback, useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {clearCategoryOutput} from 'ReduxStore/reducers/categoryState';
import {clearTasksOutput} from 'ReduxStore/reducers/taskState';

const storageName = 'userData';

interface Type {
  login: (jwtAccessToken: string, id: string, user: string) => void;
  logout: () => void;
  accessToken: string;
  userId: string;
  userName: string;
}

const useAuth = (): Type => {
  const dispatch = useDispatch();
  const [accessToken, setAccessToken] = useState('');
  const [userId, setUserId] = useState('');
  const [userName, setUserName] = useState('');

  const login = useCallback((jwtAccessToken, id, user) => {
    setAccessToken(jwtAccessToken);
    setUserId(id);
    setUserName(user);

    localStorage.setItem(
      storageName,
      JSON.stringify({
        userId: id,
        accessToken: jwtAccessToken,
        userName: user,
      }),
    );
  }, []);

  const logout = useCallback(() => {
    setAccessToken('');
    setUserId('');
    setUserName('');
    dispatch(clearCategoryOutput());
    dispatch(clearTasksOutput());

    localStorage.removeItem(storageName);
  }, []);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName) as string);

    if (data && data.accessToken) {
      login(data.accessToken, data.userId, data.userName);
    }
  }, [login]);

  return {login, logout, accessToken, userId, userName};
};

export default useAuth;
