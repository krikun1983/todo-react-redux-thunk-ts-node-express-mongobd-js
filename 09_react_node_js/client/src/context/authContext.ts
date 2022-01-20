import {createContext} from 'react';

const AuthContext = createContext({
  token: '',
  userId: '',
  userName: '',
  login: (jwtToken: string, id: string, user: string) => {},
  logout: () => {},
  isAuthenticated: false,
});

export default AuthContext;
