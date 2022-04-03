import * as React from 'react';
import { render } from '@testing-library/react';
import { PostsPage } from '../index';
import { createStateStatus } from '../../../utils/reducer/createStateStatus';

describe('<PostsPage />', () => {
  const spyConsoleError = jest.spyOn(global.console, 'error');
  const spyConsoleWarning = jest.spyOn(global.console, 'warn');
  const spyConsoleLogs = jest.spyOn(global.console, 'log');
  const getPosts = jest.fn();

  const defaultProps = {
    getPosts,
    postsState: createStateStatus()
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
    component = render(<PostsPage {...defaultProps} />);
    const foundComponent = await component.findByTestId('PostsPage');
    expect(getPosts).toHaveBeenCalledTimes(1);
    expect(foundComponent.children.length).toBe(1);
    expect(foundComponent).toHaveClass('PostsPage');
  });
});
