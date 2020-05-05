import React from 'react';
import { render } from '@testing-library/react';
import Keyboard, { isRaised } from '../Keyboard';

describe('Test keyboard', () => {
  it('should render all note keys', () => {
    const { getByText } = render(<Keyboard />);

    expect(getByText(/^C$/)).toBeInTheDocument();
    expect(getByText(/^D$/)).toBeInTheDocument();
    expect(getByText(/^E$/)).toBeInTheDocument();
    expect(getByText(/^F$/)).toBeInTheDocument();
    expect(getByText(/^G$/)).toBeInTheDocument();
    expect(getByText(/^A$/)).toBeInTheDocument();
    expect(getByText(/^B$/)).toBeInTheDocument();
  });
});

describe('Test key isRaised helper', () => {
  it('should return true if note is flat; ends with `b` ', () => {
    expect(isRaised('Ab')).toBe(true);
  });

  it('should return true if note is not flat', () => {
    expect(isRaised('A')).toBe(false);
  });
});
