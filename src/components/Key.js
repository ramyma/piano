import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Keyboard.module.scss';

function Key({ note, onClick, isRaised, isActive }) {
  const [isClicked, setIsClicked] = useState(false);

  const handleMouseDown = () => {
    setIsClicked(true);
    onClick();
  };

  const handleMouseUp = () => {
    setIsClicked(false);
  };

  const isHighlighted = isClicked || isActive;

  const isFullStep = () => {
    return ['D', 'E', 'G', 'A', 'B'].includes(note);
  };

  const classNames =
    styles.key +
    (isRaised ? ' ' + styles['raised-key'] : '') +
    (isFullStep() ? ' ' + styles['full-step'] : '') +
    (isHighlighted ? ' ' + styles['key-highlighted'] : '');

  const noteClassName = styles.note;
  return (
    <div
      onMouseDown={isRaised ? null : handleMouseDown}
      onMouseUp={isRaised ? null : handleMouseUp}
      className={classNames}
    >
      {!isRaised && <p className={noteClassName}>{note}</p>}
    </div>
  );
}

Key.propTypes = {
  note: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  isRaised: PropTypes.bool,
  isActive: PropTypes.bool,
};

export default Key;
