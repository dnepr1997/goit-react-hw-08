import css from './App.module.css';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchData } from '../../redux/contactsOps';
import { Routes, Route } from 'react-router-dom';
import { ContactsPage } from '../../pages/ContactsPage/ContactsPage';
import { RegisterPage } from '../../pages/RegisterPage/RegisterPage';
import { NotFoundPage } from '../../pages/NotFoundPage/NotFoundPage';
import { HomePage } from '../../pages/HomePage/HomePage';
import { LoginPage } from '../../pages/LoginPage/LoginPage';

import { Layout } from '../Layout/Layout';

export const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  return (
    <div className={css.form}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="contacts" element={<ContactsPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
        <Route path="login" element={<LoginPage />} />
      </Routes>
    </div>
  );
};
