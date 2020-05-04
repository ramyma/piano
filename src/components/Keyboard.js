import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Key from './Key';

const keys = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];

export const isRaised = (key) => {
  const pattern = /[A-G]b/;
  return pattern.test(key);
};

function Keyboard({ onKeyPlayed }) {
  return (
    <section id="keyboard">
      {keys.map((k) => (
        <Key
          key={k}
          note={k}
          showNote
          raised={isRaised(k)}
          onMouseDown={() => onKeyPlayed(k)}
        />
      ))}
    </section>
  );
}

Keyboard.propTypes = {};

export default Keyboard;
