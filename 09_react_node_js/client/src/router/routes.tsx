import React from 'react';
import HomePage from 'Pages/HomePage';
import LoginPage from 'Pages/LoginPage/LoginPage';
import NotFoundPage from 'Pages/NotFoundPage';
import TaskEditPage from 'Pages/TaskEditPage';
import {Route, Routes} from 'react-router-dom';

const privateRoutes = [
  {path: '/', element: HomePage},
  {path: '/categories/:id', element: HomePage},
  {path: '/categories/:id?search=:value', element: HomePage},
  {path: '/categories/:categoryId/task/:id/edit', element: TaskEditPage},
  {path: '*', element: NotFoundPage},
];

const publicRoutes = [
  {path: '/', element: LoginPage},
  {path: '*', element: LoginPage},
];

export const useRoutes = (isAuth: boolean): JSX.Element => {
  if (isAuth) {
    return (
      <Routes>
        {privateRoutes.map(route => (
          <Route
            key={route.path}
            path={route.path}
            element={<route.element />}
          />
        ))}
      </Routes>
    );
  } else {
    return (
      <Routes>
        {publicRoutes.map(route => (
          <Route
            key={route.path}
            path={route.path}
            element={<route.element />}
          />
        ))}
      </Routes>
    );
  }
};
