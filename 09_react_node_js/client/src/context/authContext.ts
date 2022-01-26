import {createContext} from 'react';

interface ContextProps {
  accessToken: string;
  userId: string;
  userName: string;
  login: (jwtAccessToken: string, id: string, user: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext({} as ContextProps);

export default AuthContext;
