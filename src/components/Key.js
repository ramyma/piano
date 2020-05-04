import React, { useState } from 'react';
import PropTypes from 'prop-types';

function Key({ note, onMouseDown, raised, showNote }) {
  const [isClicked, setIsClicked] = useState(false);

  const handleMouseDown = () => {
    setIsClicked(true);
    onMouseDown();
  };

  const handleMouseUp = () => {
    setIsClicked(false);
  };

  const isNoteVisible = isClicked || showNote;

  return (
    <div
      id={note}
      onMouseDown={raised ? null : handleMouseDown}
      onMouseUp={raised ? null : handleMouseUp}
      data-testid={note}
    >
      {isNoteVisible && <span>{note}</span>}
    </div>
  );
}

Key.propTypes = {
  note: PropTypes.string.isRequired,
  onMouseDown: PropTypes.func,
  showNote: PropTypes.bool,
};

export default Key;
