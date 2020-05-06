import { render } from '@testing-library/react';
import user from '@testing-library/user-event';
import { axe } from 'jest-axe';
import 'jest-axe/extend-expect';
import React from 'react';
import { act } from 'react-dom/test-utils';
import App, { logReducer } from '../App';

describe('Test App', () => {
  afterEach(() => {
    jest.useRealTimers();
  });
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
    const { getAllByText, getByLabelText } = render(<App />);

    // Play the C note on first keyboard.
    const cKey = getAllByText(/^C$/)[0];
    user.click(cKey);

    const logElement = getByLabelText(/log/i);
    // Expect the played note to be added to the log entries
    expect(logElement).toHaveTextContent('C');

    const aKey = getAllByText(/^A$/)[0];
    user.click(aKey);

    ////////
    /// Check for second keyboard (comment out if only 1 keyboard is used)
    ////////

    // Expect the played notes to be added to the log entries
    expect(logElement).toHaveTextContent(/^AC$/);

    // Play the C note on second keyboard.
    const cKey2 = getAllByText(/^G$/)[1];
    user.click(cKey2);

    const aKey2 = getAllByText(/^E$/)[1];
    user.click(aKey2);

    // Expect the played notes to be added to the log entries
    expect(logElement).toHaveTextContent(/^EGAC$/);

    ////////
  });

  it('should clear timeout if unmounted before the timer finishes', () => {
    const { unmount, getByText, getByLabelText } = render(<App />);

    jest.useFakeTimers();

    const textArea = getByLabelText('notes to play');
    const playButton = getByText(/^play$/i);

    user.type(textArea, 'C,D,E,F,G,A', { allAtOnce: true });
    user.click(playButton);

    unmount();

    expect(clearTimeout).toHaveBeenCalledTimes(1);
  });

  it('should call setTimeout when playing notes', async () => {
    const { getByText, getByLabelText } = render(<App />);

    jest.useFakeTimers();

    const textArea = getByLabelText('notes to play');
    const playButton = getByText(/^play$/i);

    const originalDateNow = Date.now;

    // mock Date.now implementation
    Date.now = () => parseInt(Math.random() * 1000000);

    user.type(textArea, 'C,D,E');
    user.click(playButton);

    act(() => {
      jest.runAllTimers();
    });

    // restore Date.now() implementation
    Date.now = originalDateNow;

    expect(setTimeout).toHaveBeenCalledTimes(3);
  });

  it('should clear log entries when clear log button is clicked', async () => {
    const { getByText, getByLabelText, getAllByText } = render(<App />);

    const clearLogButton = getByText(/^clear log$/i);
    const logElement = getByLabelText(/log/i);

    // Play the C note on first keyboard.
    const cKey = getAllByText(/^C$/)[0];
    user.click(cKey);

    user.click(clearLogButton);

    expect(logElement).toHaveTextContent(/no log entries yet/i);
  });

  it('should be accessible', async () => {
    const { container } = render(<App />);

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
