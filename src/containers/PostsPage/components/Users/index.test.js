import * as React from 'react';
import { render } from '@testing-library/react';
import { Users } from './index';

describe('<Users />', () => {
  const spyConsoleError = jest.spyOn(global.console, 'error');
  const spyConsoleWarning = jest.spyOn(global.console, 'warn');
  const spyConsoleLogs = jest.spyOn(global.console, 'log');

  const defaultProps = {
    users: [
      { userName: 'Isidro Schuett', postCount: 5 },
      { userName: 'Nydia Croff', postCount: 7 },
      { userName: 'Leonarda Schult', postCount: 8 }
    ]
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
    component = render(<Users {...defaultProps} />);
    const foundComponent = await component.findByTestId('Users');
    expect(foundComponent.children.length).toBe(defaultProps.users.length);
    expect(foundComponent).toHaveClass('Users');
    const messageComponent = foundComponent.querySelector('.Users__empty');
    expect(messageComponent).toBeFalsy();
  });

  it('Expect to render empty message', async () => {
    component = render(<Users {...defaultProps} users={[]} />);
    const foundComponent = await component.findByTestId('Users__empty');
    expect(foundComponent).toHaveTextContent('Users has not been found');
  });
});
