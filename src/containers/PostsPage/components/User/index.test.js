import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { User } from './index';

describe('<User />', () => {
  const spyConsoleError = jest.spyOn(global.console, 'error');
  const spyConsoleWarning = jest.spyOn(global.console, 'warn');
  const spyConsoleLogs = jest.spyOn(global.console, 'log');

  const onClick = jest.fn();

  const defaultProps = {
    userName: 'testUser',
    postCount: 10,
    onClick,
    currentUser: 'someone'
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
    component = render(<User {...defaultProps} />);
    const foundComponent = await component.findByTestId('User');
    expect(foundComponent.children.length).toBe(2);
    expect(foundComponent).toHaveClass('User');
  });

  it('Expect to render name', async () => {
    component = render(<User {...defaultProps} />);
    const foundComponent = await component.findByTestId('User');
    const messageComponent = foundComponent.querySelector('.User__name');
    expect(messageComponent).toHaveTextContent(defaultProps.userName);
  });

  it('Expect to render posts count', async () => {
    component = render(<User {...defaultProps} />);
    const foundComponent = await component.findByTestId('User');
    const messageComponent = foundComponent.querySelector('.User__count');
    expect(messageComponent).toHaveTextContent(defaultProps.postCount);
  });

  it('Expect to have selected class', async () => {
    component = render(<User {...defaultProps} currentUser={defaultProps.userName} />);
    const foundComponent = await component.findByTestId('User');
    expect(foundComponent).toHaveClass('selected');
  });

  it('Expect to call onClick with username', async () => {
    component = render(<User {...defaultProps} currentUser={defaultProps.userName} />);
    const foundComponent = await component.findByTestId('User');
    fireEvent.click(foundComponent);
    expect(onClick).toBeCalledWith(defaultProps.userName);
    expect(onClick).toBeCalledTimes(1);
    fireEvent.click(foundComponent);
    expect(onClick).toBeCalledTimes(2);
  });
});
