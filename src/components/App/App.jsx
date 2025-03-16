import s from './App.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchContacts } from '../../redux/contacts/contactsOps';
import { Routes, Route } from 'react-router-dom';
import { ContactsPage } from '../../pages/ContactsPage/ContactsPage';
import { RegisterPage } from '../../pages/RegisterPage/RegisterPage';
import { NotFoundPage } from '../../pages/NotFoundPage/NotFoundPage';
import { HomePage } from '../../pages/HomePage/HomePage';
import { LoginPage } from '../../pages/LoginPage/LoginPage';

import { Layout } from '../Layout/Layout';
import { refreshUser } from '../../redux/auth/authOperations';
import { selectIsRefreshing } from '../../redux/auth/selectors';
import { PrivateRoute } from '../PrivateRoute/PrivateRoute';
import { RestrictedRoute } from '../RestrictedRoute/RestrictedRoute';

export const App = () => {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);
  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  // useEffect(() => {
  //   dispatch(fetchData());
  // }, [dispatch]);

  return isRefreshing ? null : (
    <div className={s.form}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/contacts"
            element={
              <PrivateRoute>
                <ContactsPage />
              </PrivateRoute>
            }
          />

          <Route
            path="/login"
            element={<RestrictedRoute component={<LoginPage />} redirectTo="/contacts" />}
          />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </div>
  );
};
