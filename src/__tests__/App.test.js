import React, { useReducer } from 'react';
import { render } from '@testing-library/react';
import user from '@testing-library/user-event';
import App, { logReducer } from '../App';

describe('Test App', () => {
  test.skip('renders learn react link', () => {
    const { getByText } = render(<App />);
    const linkElement = getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
  });

  it('should add log entries using log reducer', () => {
    const action = { type: 'ADD_LOG_ENTRY', entry: 'A', id: '1' };
    const newState = logReducer([], action);
    expect(newState).toEqual([{ entry: 'A', id: '1' }]);

    const action2 = { type: 'ADD_LOG_ENTRY', entry: 'B', id: '2' };
    const newState2 = logReducer(newState, action2);
    expect(newState2).toEqual([
      { entry: 'A', id: '1' },
      { entry: 'B', id: '2' },
    ]);
  });

  it('should add played note to log', () => {
    const { getByTestId, getByLabelText } = render(<App />);

    // Play the C note
    const cKey = getByTestId('C');
    user.click(cKey);

    const logElement = getByLabelText(/log/i);
    // Expect the played note to be added to the log entries
    expect(logElement).toHaveTextContent('C');

    const AKey = getByTestId('A');
    user.click(AKey);

    // Expect the played notes to be added to the log entries
    expect(logElement).toHaveTextContent('CA');
  });
});
