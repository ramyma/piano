import React from 'react';
import { render } from '@testing-library/react';
import Keyboard, { isRaised } from '../Keyboard';

describe('Test keyboard', () => {
  it('should render all note keys', () => {
    const { getByTestId } = render(<Keyboard />);

    expect(getByTestId('C')).toBeInTheDocument();
    expect(getByTestId('Db')).toBeInTheDocument();
    expect(getByTestId('D')).toBeInTheDocument();
    expect(getByTestId('Eb')).toBeInTheDocument();
    expect(getByTestId('E')).toBeInTheDocument();
    expect(getByTestId('F')).toBeInTheDocument();
    expect(getByTestId('Gb')).toBeInTheDocument();
    expect(getByTestId('G')).toBeInTheDocument();
    expect(getByTestId('Ab')).toBeInTheDocument();
    expect(getByTestId('A')).toBeInTheDocument();
    expect(getByTestId('Bb')).toBeInTheDocument();
    expect(getByTestId('B')).toBeInTheDocument();
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
