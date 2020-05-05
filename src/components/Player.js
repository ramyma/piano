import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Player.module.scss';

export const notesArrayFromString = (notes) => {
  const trimmed = notes.replace(/\s|(,$)/g, '');
  return trimmed.split(',');
};

export default function Player({ playNotes }) {
  const [notes, setNotes] = useState('');

  const handleTextChange = (e) => {
    const value = e.target.value;

    if (/(^$)|(^[A-G](,[A-G])*,?$)/gi.test(value)) {
      setNotes(value.toUpperCase());
    }
  };

  const handlePlayClick = () => {
    const notesArray = notesArrayFromString(notes);
    playNotes(notesArray);
  };

  return (
    <section className={styles.container}>
      <textarea
        aria-label="notes to play"
        className={styles.textarea}
        value={notes}
        onChange={handleTextChange}
        placeholder={
          'Enter some comma separated notes and press "Play" to start playing, eg: C,D,E...'
        }
      />
      <button disabled={!notes} onClick={handlePlayClick}>
        Play
      </button>
    </section>
  );
}

Player.propTypes = {
  playNotes: PropTypes.func,
};
