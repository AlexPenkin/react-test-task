import * as React from 'react';
import { render } from '@testing-library/react';
import { LoginPage } from '../index';
import { createStateStatus } from '../../../utils/reducer/createStateStatus';

describe('<LoginPage />', () => {
  const spyConsoleError = jest.spyOn(global.console, 'error');
  const spyConsoleWarning = jest.spyOn(global.console, 'warn');
  const spyConsoleLogs = jest.spyOn(global.console, 'log');
  const resetMakeLoginStatus = jest.fn();
  const makeLogin = jest.fn();

  const defaultProps = {
    resetMakeLoginStatus,
    loggingState: createStateStatus(),
    makeLogin
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
    component = render(<LoginPage {...defaultProps} />);
    const foundComponent = await component.findByTestId('LoginPage');
    expect(makeLogin).toHaveBeenCalledTimes(0);
    expect(foundComponent.children.length).toBe(1);
    expect(foundComponent).toHaveClass('LoginPage');
  });
});
