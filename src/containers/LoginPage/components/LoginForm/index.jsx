import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import './style.less';
import { FormField } from '../../../../components/FormField';

const loginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  name: Yup.string().min(6, 'Too Short!').max(50, 'Too Long!').required('Required')
});

export const LoginForm = (props) => {
  const { onSubmit, isError, isFetching } = props;

  const buttonText = isFetching ? 'Pending' : 'Go';

  return (
    <div data-testid="LoginForm" className="LoginForm">
      <Formik
        initialValues={{
          name: '',
          email: ''
        }}
        validationSchema={loginSchema}
        onSubmit={(values) => {
          onSubmit(values);
        }}
      >
        {() => (
          <Form>
            <Field name="email" labelName="Email" type="email" component={FormField} />
            <Field name="name" labelName="Name" component={FormField} />
            <button className="LoginForm__submit" type="submit">
              {buttonText}
            </button>

            {isError && !isFetching && <div className="LoginForm__error">{isError.message}</div>}
          </Form>
        )}
      </Formik>
    </div>
  );
};

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isError: PropTypes.object,
  isFetching: PropTypes.bool
};
