import { Field, Form, Formik, replace } from 'formik';
import React from 'react';
import s from './LoginForm.module.css';
import { useDispatch } from 'react-redux';
import { loginThunk } from '../../redux/auth/operations';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';

export const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialValues = {
    email: '',
    password: '',
  };

  const handleSubmit = (values, options) => {
    console.log(values);
    dispatch(loginThunk(values))
      .unwrap()
      .then(() => {
        toast.success('Login successful!');
        setTimeout(() => navigate('/contacts', { replace: true }), 800);
      })
      .catch(() => {
        toast.error('Invalid data');
      });
    options.resetForm();
  };
  return (
    <div>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form className={s.form}>
          <label>
            <span>Email:</span>
            <Field name="email" className={s.input} />
          </label>
          <label>
            <span>Password:</span>
            <Field name="password" type="password" className={s.input} />
          </label>
          <button type="submit" className={s.button}>
            Login
          </button>
          <p>
            You do not have account yet? <Link to="/register">Get it!</Link>
          </p>
        </Form>
      </Formik>
      <ToastContainer />
    </div>
  );
};
