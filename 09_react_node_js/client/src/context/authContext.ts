import {createContext} from 'react';

const AuthContext = createContext({
  accessToken: '',
  userId: '',
  userName: '',
  login: (jwtAccessToken: string, id: string, user: string) => {},
  logout: () => {},
  isAuthenticated: false,
});

export default AuthContext;
