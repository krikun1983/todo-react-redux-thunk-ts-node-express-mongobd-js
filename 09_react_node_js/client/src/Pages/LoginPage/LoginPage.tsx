import React, {
  ChangeEvent,
  FormEvent,
  useContext,
  useEffect,
  useState,
} from 'react';
import useHTTP from 'hook/useHTTP';
import {Button} from 'UI-Kit';
import MyInput from 'UI-Kit/Input/MyInput';
import style from './LoginPage.module.scss';
import AuthContext from 'context/authContext';

const LoginPage: React.FC = () => {
  const auth = useContext(AuthContext);
  const {loading, errors, request, clearError} = useHTTP();
  const [form, setForm] = useState({username: '', password: ''});

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  const handleAuth = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({...form, [e.target.name]: e.target.value});
  };

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = await request('/api/login', 'POST', {...form});
      auth.login(data.token, data.userId, data.username);
    } catch (error) {
      console.log(errors);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <div className={style.login}>
        <div className={style.login__content}>
          <h1 className={style.login__heading}>Authorization page</h1>
          <div>
            <label htmlFor="login">Login:</label>
            <MyInput
              id="login"
              placeholder="Enter Login"
              type="text"
              name="username"
              onChange={handleAuth}
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <MyInput
              id="password"
              placeholder="Enter Password"
              type="password"
              name="password"
              autoComplete="current-password"
              onChange={handleAuth}
            />
          </div>
          <div>
            <Button
              styles="btn_blue"
              type="submit"
              text="Sing In my Todo App"
            />
          </div>
          {errors && <h4 className={style.login__errors}>{errors}</h4>}
        </div>
      </div>
    </form>
  );
};

export default LoginPage;
