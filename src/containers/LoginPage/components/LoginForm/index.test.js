import * as React from 'react';
import { fireEvent, render, waitFor, act } from '@testing-library/react';
// import { act } from 'react-dom/test-utils';
import { LoginForm } from './index';

describe('<LoginForm />', () => {
  const spyConsoleError = jest.spyOn(global.console, 'error');
  const spyConsoleWarning = jest.spyOn(global.console, 'warn');
  const spyConsoleLogs = jest.spyOn(global.console, 'log');

  const data = {
    email: 'test@test.com',
    name: 'testValue'
  };

  const onSubmit = jest.fn();
  const defaultProps = {
    onSubmit
  };

  let component;

  afterEach(() => {
    component.unmount();
    expect(spyConsoleError).not.toHaveBeenCalled();
    expect(spyConsoleWarning).not.toHaveBeenCalled();
    expect(spyConsoleLogs).not.toHaveBeenCalled();
    jest.resetAllMocks();
  });

  it('Expect to render main div', async () => {
    component = render(<LoginForm {...defaultProps} />);
    const foundComponent = await component.findByTestId('LoginForm');
    expect(foundComponent.children.length).toBe(1);
    expect(foundComponent).toHaveClass('LoginForm');
  });

  it('Expect to submit form', async () => {
    component = render(<LoginForm {...defaultProps} />);
    const foundComponent = await component.findByTestId('LoginForm');
    const emailInput = foundComponent.querySelector('#email');
    const nameInput = foundComponent.querySelector('#name');
    const submitButton = foundComponent.querySelector('.LoginForm__submit');

    act(() => {
      fireEvent.change(emailInput, { target: { value: data.email } });
      fireEvent.change(nameInput, { target: { value: data.name } });
    });
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith(data);
      expect(onSubmit).toHaveBeenCalledTimes(1);
    });
  });

  it('Expect not to submit form', async () => {
    component = render(<LoginForm {...defaultProps} />);
    const foundComponent = await component.findByTestId('LoginForm');
    const emailInput = foundComponent.querySelector('#email');
    const nameInput = foundComponent.querySelector('#name');
    const submitButton = foundComponent.querySelector('.LoginForm__submit');

    act(() => {
      fireEvent.change(emailInput, { target: { value: 'not email' } });
      fireEvent.change(nameInput, { target: { value: 'short' } });
    });
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(0);
      expect(foundComponent).toHaveTextContent('Invalid email');
      expect(foundComponent).toHaveTextContent('Too Short!');
    });
  });

  it('Expect to show the error ', async () => {
    const error = new Error('test');
    component = render(<LoginForm {...defaultProps} isError={error} />);
    const foundComponent = await component.findByTestId('LoginForm');

    expect(foundComponent).toHaveTextContent(error.message);
  });

  it('Expect to show pending message ', async () => {
    component = render(<LoginForm {...defaultProps} isFetching />);
    const foundComponent = await component.findByTestId('LoginForm');
    const submitButton = foundComponent.querySelector('.LoginForm__submit');

    expect(submitButton).toHaveTextContent('Pending');
  });
});
