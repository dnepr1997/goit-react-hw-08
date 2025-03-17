import s from './App.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchContacts } from '../../redux/contacts/operations';
import { Routes, Route } from 'react-router-dom';
import { ContactsPage } from '../../pages/ContactsPage/ContactsPage';
import { RegistrationForm } from '../RegistrationForm/RegistrationForm';
import { NotFoundPage } from '../../pages/NotFoundPage/NotFoundPage';
import { HomePage } from '../../pages/HomePage/HomePage';
import { LoginPage } from '../../pages/LoginForm/LoginForm';

import { Layout } from '../Layout/Layout';
import { refreshUser } from '../../redux/auth/operations';
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

  if (isRefreshing) return <p>Loading...</p>;
  return (
    <div className={s.form}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/contacts"
            element={<PrivateRoute redirectTo="/login" component={<ContactsPage />} />}
          />

          <Route
            path="/login"
            element={<RestrictedRoute component={<LoginPage />} redirectTo="/contacts" />}
          />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </div>
  );
};
