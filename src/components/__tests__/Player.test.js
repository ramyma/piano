import { render, fireEvent } from '@testing-library/react';
import user from '@testing-library/user-event';
import React from 'react';
import Player, { notesArrayFromString } from '../Player';

const PLAY_BUTTON_PATTERN = /^play$/i;

describe('Test Player component', () => {
  it('should render a textbox and a play button', () => {
    const { getByRole, getByText } = render(<Player />);
    expect(getByRole('textbox')).toBeInTheDocument();
    expect(getByText(PLAY_BUTTON_PATTERN)).toBeInTheDocument();
  });

  it('should allow notes and commas only to be typed in textbox and should capitalize the notes letters', async () => {
    const { getByRole } = render(<Player />);

    const textboxElement = getByRole('textbox');

    fireEvent.change(textboxElement, { target: { value: 'a' } });
    fireEvent.change(textboxElement, { target: { value: 'A4' } });
    fireEvent.change(textboxElement, { target: { value: 'A,' } });
    fireEvent.change(textboxElement, { target: { value: 'A,B' } });
    fireEvent.change(textboxElement, { target: { value: 'A,B,' } });
    fireEvent.change(textboxElement, { target: { value: 'A,B,C' } });
    fireEvent.change(textboxElement, { target: { value: 'A,B,C,' } });
    fireEvent.change(textboxElement, { target: { value: 'A,B,C,d' } });

    expect(textboxElement).toHaveTextContent('A,B,C,D');
  });

  it('should update textbox value on user typing and submits an array on clicking Play', () => {
    const playNotesMock = jest.fn((notes) => notes);
    const { getByRole, getByText } = render(
      <Player playNotes={playNotesMock} />
    );

    const textboxElement = getByRole('textbox');
    const notesToPlay = 'C,D,E,F,G,A,B,';

    user.type(textboxElement, notesToPlay);
    expect(textboxElement).toHaveTextContent(notesToPlay);

    user.click(getByText(PLAY_BUTTON_PATTERN));

    expect(playNotesMock).toHaveBeenCalledTimes(1);
    expect(playNotesMock).toHaveBeenCalledWith([
      'C',
      'D',
      'E',
      'F',
      'G',
      'A',
      'B',
    ]);
  });

  it('should disable Play button if there are no notes to play', () => {
    const { getByText, getByRole } = render(<Player />);

    const playButton = getByText(PLAY_BUTTON_PATTERN);

    expect(playButton).toBeDisabled();

    user.type(getByRole('textbox'), 'C,D,E');

    expect(playButton).not.toBeDisabled();
  });
});

test('notesArrayFromString function should return an array of notes give a comma separated notes string', () => {
  expect(notesArrayFromString('C,D, E,')).toEqual(['C', 'D', 'E']);
});
