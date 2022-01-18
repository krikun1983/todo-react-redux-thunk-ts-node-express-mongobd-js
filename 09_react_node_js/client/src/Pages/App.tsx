import React from 'react';
import {Route, Routes} from 'react-router-dom';
import HomePage from 'Pages/HomePage';
import TaskEditPage from 'Pages/TaskEditPage';
import NotFoundPage from 'Pages/NotFoundPage';

const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/categories/:id" element={<HomePage />} />
        <Route path="/categories/:id?search=:value" element={<HomePage />} />
        <Route
          path="/categories/:categoryId/task/:id/edit"
          element={<TaskEditPage />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

export default App;
