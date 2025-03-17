import { Field, Form, Formik } from 'formik';
import React from 'react';
import s from './RegistrationForm.module.css';
import { useDispatch } from 'react-redux';
import { registerThunk } from '../../redux/auth/operations';
import { Link } from 'react-router-dom';

export const RegistrationForm = () => {
  const dispatch = useDispatch();
  const initialValues = {
    name: '',
    email: '',
    password: '',
  };

  const handleSubmit = (values, options) => {
    console.log(values);
    dispatch(registerThunk(values));
    options.resetForm();
  };
  return (
    <div>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form className={s.form}>
          <label>
            <span>Name:</span>
            <Field name="name" className={s.input} />
          </label>
          <label>
            <span>Email:</span>
            <Field name="email" className={s.input} />
          </label>
          <label>
            <span>Password:</span>
            <Field name="password" type="password" className={s.input} />
          </label>
          <button type="submit" className={s.button}>
            Register
          </button>
          <p>
            You already have account? <Link to="/login">Get it!</Link>
          </p>
        </Form>
      </Formik>
    </div>
  );
};
