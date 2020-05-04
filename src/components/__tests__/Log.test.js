import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import React from 'react';
import Log from '../Log';

describe('Test Log component', () => {
  it('should show log entries', () => {
    const { getByLabelText, rerender } = render(<Log logEntries={[]} />);
    const logElement = getByLabelText(/log/i);
    expect(logElement).toHaveTextContent('');
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
});
