import * as React from 'react';
import { render } from '@testing-library/react';
import { Post } from './index';

describe('<Post />', () => {
  const spyConsoleError = jest.spyOn(global.console, 'error');
  const spyConsoleWarning = jest.spyOn(global.console, 'warn');
  const spyConsoleLogs = jest.spyOn(global.console, 'log');

  const defaultProps = {
    message: 'test message',
    created_time: new Date(2020, 10, 10).toISOString()
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
    component = render(<Post {...defaultProps} />);
    const foundComponent = await component.findByTestId('Post');
    expect(foundComponent.children.length).toBe(2);
    expect(foundComponent).toHaveClass('Post');
  });

  it('Expect to render message', async () => {
    component = render(<Post {...defaultProps} />);
    const foundComponent = await component.findByTestId('Post');
    const messageComponent = foundComponent.querySelector('.Post__text');
    expect(messageComponent).toHaveTextContent(defaultProps.message);
  });

  it('Expect to render time', async () => {
    component = render(<Post {...defaultProps} />);
    const foundComponent = await component.findByTestId('Post');
    const messageComponent = foundComponent.querySelector('.Post__time');
    expect(messageComponent).toHaveTextContent('November 10, 2020 12:00:00');
  });
});
