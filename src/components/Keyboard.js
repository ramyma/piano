import React from 'react';
import PropTypes from 'prop-types';
import Key from './Key';
import styles from './Keyboard.module.scss';

const keys = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];

export const isRaised = (key) => {
  const pattern = /[A-G]b/;
  return pattern.test(key);
};

function Keyboard({ activeKey, onKeyPlayed }) {
  return (
    <section className={styles.keyboard}>
      {keys.map((note) => (
        <Key
          key={note}
          note={note}
          showNote
          isRaised={isRaised(note)}
          onClick={() => onKeyPlayed(note)}
          isActive={activeKey === note}
        />
      ))}
    </section>
  );
}

Keyboard.propTypes = {
  activeKey: PropTypes.string,
  onKeyPlayed: PropTypes.func,
};

export default Keyboard;
