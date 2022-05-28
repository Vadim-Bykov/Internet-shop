import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { Shop } from '../pages/Shop';
import { authRoutes, publicRoutes } from '../routes';

export const AppRouter = () => {
  const isAuth = true;

  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path='/' element={<Shop />} /> */}
        {isAuth &&
          authRoutes.map(({ path, Component }) => (
            <Route key={path} path={path} element={<Component />} />
          ))}

        {publicRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}

        <Route path='*' element={<Shop />} replace />
      </Routes>
    </BrowserRouter>
  );
};
