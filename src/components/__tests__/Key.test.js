import React from 'react';
import Key from '../Key';
import { render, fireEvent } from '@testing-library/react';

describe('Test piano key', () => {
  it('should render piano key', () => {
    const onMouseDown = jest.fn();
    const { getByText } = render(<Key note="A" onMouseDown={onMouseDown} />);

    expect(getByText(/^A$/)).toBeInTheDocument();
  });

  it('should show note letter on mouse down and hide it on mouse up', () => {
    const onClickMock = jest.fn();
    const { getByText } = render(<Key note="A" onClick={onClickMock} />);

    const key = getByText(/^A$/);

    fireEvent.mouseDown(key);

    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});
