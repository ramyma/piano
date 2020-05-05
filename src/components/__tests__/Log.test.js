import { render } from '@testing-library/react';
import user from '@testing-library/user-event';
import React from 'react';
import Log from '../Log';

describe('Test Log component', () => {
  it('should show log entries', () => {
    const { getByLabelText, rerender } = render(<Log logEntries={[]} />);
    const logElement = getByLabelText(/log/i);

    rerender(<Log logEntries={[{ entry: 'B', id: 1 }]} />);
    expect(logElement).toHaveTextContent('B');
    rerender(
      <Log
        logEntries={[
          { entry: 'B', id: 1 },
          { entry: 'A', id: 2 },
          { entry: 'C', id: 3 },
        ]}
      />
    );
    expect(logElement).toHaveTextContent(/^BAC$/);
  });

  it('should clear log entries when clear log button is clicked', () => {
    const clearLogMock = jest.fn();
    const { getByText } = render(
      <Log
        logEntries={[
          { entry: 'B', id: 1 },
          { entry: 'A', id: 2 },
        ]}
        clearLog={clearLogMock}
      />
    );

    user.click(getByText(/clear log/i));

    expect(clearLogMock).toBeCalledTimes(1);
  });

  it('should disable clear log button if there are no log entries', () => {
    const { getByText, rerender } = render(<Log logEntries={[]} />);

    const clearLogButton = getByText(/clear log/i);

    expect(clearLogButton).toBeDisabled();

    rerender(
      <Log
        logEntries={[
          { entry: 'B', id: 1 },
          { entry: 'A', id: 2 },
        ]}
      />
    );

    expect(clearLogButton).not.toBeDisabled();
  });

  it('should show empty state messge when there are no log entries', () => {
    const { rerender, getByLabelText } = render(<Log logEntries={[]} />);

    const emptyStatePattern = /no log entries yet/i;

    expect(getByLabelText(/log/i)).toHaveTextContent(emptyStatePattern);

    rerender(
      <Log
        logEntries={[
          { entry: 'B', id: 1 },
          { entry: 'A', id: 2 },
        ]}
      />
    );

    expect(getByLabelText(/log/i)).not.toHaveTextContent(emptyStatePattern);
  });
});
