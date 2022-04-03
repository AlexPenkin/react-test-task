import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './style.less';

import { Input } from '../Input';
import { FormError } from '../FormError';

export const FormField = (props) => {
  const {
    className,
    labelName,
    field,
    form,
    field: { name }
  } = props;
  const classNames = classnames({
    FormField: true,
    [className]: !!className
  });

  return (
    <div className={classNames}>
      <label htmlFor={name}>{labelName}</label>
      <Input {...field} id={name} />
      {form.errors[name] && form.touched[name] ? <FormError error={form.errors[name]} /> : null}
    </div>
  );
};

FormField.propTypes = {
  className: PropTypes.string,
  labelName: PropTypes.string,
  name: PropTypes.string,
  form: PropTypes.object,
  field: PropTypes.object
};
