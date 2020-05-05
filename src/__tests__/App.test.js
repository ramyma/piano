import { render } from '@testing-library/react';
import user from '@testing-library/user-event';
import { axe } from 'jest-axe';
import 'jest-axe/extend-expect';
import React from 'react';
import App, { logReducer } from '../App';

describe('Test App', () => {
  it('should add log entries using log reducer', () => {
    const action = { type: 'ADD_LOG_ENTRY', entry: 'A', id: '1' };
    const newState = logReducer([], action);
    expect(newState).toEqual([{ entry: 'A', id: '1' }]);

    const action2 = { type: 'ADD_LOG_ENTRY', entry: 'B', id: '2' };
    const newState2 = logReducer(newState, action2);
    expect(newState2).toEqual([
      { entry: 'B', id: '2' },
      { entry: 'A', id: '1' },
    ]);
  });

  it('should clear log entries using log reducer', () => {
    const action = { type: 'CLEAR_LOG_ENTRIES' };
    const newState = logReducer(
      [
        { entry: 'B', id: '2' },
        { entry: 'A', id: '1' },
      ],
      action
    );

    expect(newState).toEqual([]);
  });

  it('should add played note to log', () => {
    const { getByText, getByLabelText } = render(<App />);

    // Play the C note
    const cKey = getByText(/^C$/);
    user.click(cKey);

    const logElement = getByLabelText(/log/i);
    // Expect the played note to be added to the log entries
    expect(logElement).toHaveTextContent('C');

    const aKey = getByText(/^A$/);
    user.click(aKey);

    // Expect the played notes to be added to the log entries
    expect(logElement).toHaveTextContent('AC');
  });

  it('should be accessible', async () => {
    const { container } = render(<App />);

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
