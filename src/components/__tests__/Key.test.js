import React from 'react';
import Key from '../Key';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('Test piano key', () => {
  it('should render piano key', () => {
    const onMouseDown = jest.fn();
    const { getByTestId } = render(<Key note="A" onMouseDown={onMouseDown} />);

    expect(getByTestId('A')).toBeInTheDocument();
  });

  it('should show note letter on mouse down and hide it on mouse up', () => {
    const onMouseDown = jest.fn();
    const { getByTestId } = render(<Key note="A" onMouseDown={onMouseDown} />);

    const key = getByTestId('A');
    expect(key).toHaveTextContent(/^$/);

    fireEvent.mouseDown(key);

    expect(key).toHaveTextContent(/^A$/);

    fireEvent.mouseUp(key);
    expect(key).toHaveTextContent(/^$/);

    expect(onMouseDown).toHaveBeenCalledTimes(1);
  });
});
