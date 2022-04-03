import * as React from 'react';
import { render } from '@testing-library/react';
import { Posts } from './index';

describe('<Posts />', () => {
  const spyConsoleError = jest.spyOn(global.console, 'error');
  const spyConsoleWarning = jest.spyOn(global.console, 'warn');
  const spyConsoleLogs = jest.spyOn(global.console, 'log');

  const defaultProps = {
    posts: [
      {
        id: 'post62496c7559c82_d267292a',
        from_name: 'Mandie Nagao',
        from_id: 'user_17',
        message:
          'rhythm margin correspond ditch boy tin kinship use therapist pour food dare broken indulge lawyer dragon entitlement difficulty kidney railroad flavor',
        type: 'status',
        created_time: '2022-04-02T12:14:28+00:00'
      },
      {
        id: 'post62496c7559e0e_b415a84c',
        from_name: 'Mandie Nagao',
        from_id: 'user_17',
        message:
          'tick prediction bottom heavy scream confusion mistreat trait feature bar bracket noble tract formula bracket marsh science ethics education bullet egg white stubborn opposite script pot surround photocopy magazine vertical birthday retired dream acquisition height control recruit tape space margin pole ban adoption script export scream release roar poor',
        type: 'status',
        created_time: '2022-03-18T04:43:07+00:00'
      }
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
    component = render(<Posts {...defaultProps} />);
    const foundComponent = await component.findByTestId('Posts');
    expect(foundComponent.children.length).toBe(defaultProps.posts.length);
    expect(foundComponent).toHaveClass('Posts');
    const messageComponent = foundComponent.querySelector('.Posts__empty');
    expect(messageComponent).toBeFalsy();
  });

  it('Expect to render empty message', async () => {
    component = render(<Posts {...defaultProps} posts={[]} />);
    const foundComponent = await component.findByTestId('Posts__empty');
    expect(foundComponent).toHaveTextContent('Posts has not been found');
  });
});
