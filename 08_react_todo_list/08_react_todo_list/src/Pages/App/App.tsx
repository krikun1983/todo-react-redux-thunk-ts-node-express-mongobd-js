import HomePage from 'Pages/HomePage/HomePages';
import NotFoundPage from 'Pages/NotFoundPage/NotFoundPage';
import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Loader from 'UI-Kit/Loader/Loader';

const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/categories/:id" element={<HomePage />} />
        <Route path="/categories/:id?task=:value" element={<HomePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Loader />
    </>
  );
};

export default App;
