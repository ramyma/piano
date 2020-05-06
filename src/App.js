import React, { useEffect, useReducer, useRef, useState } from 'react';
import './App.scss';
import Keyboard from './components/Keyboard';
import Log from './components/Log';
import Player from './components/Player';

export const logReducer = (state, action) => {
  if (action.type === 'ADD_LOG_ENTRY') {
    return [{ entry: action.entry, id: action.id }, ...state];
  }
  if (action.type === 'CLEAR_LOG_ENTRIES') {
    return [];
  }
  return state;
};

const logInitialState = [];

function App() {
  const [logEntries, dispatchLogAction] = useReducer(
    logReducer,
    logInitialState
  );

  const [activeKey, setActiveKey] = useState();

  const timeoutRef = useRef();

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleKeyPlayed = (key) => {
    dispatchLogAction({ type: 'ADD_LOG_ENTRY', entry: key, id: Date.now() });
  };

  const playNotes = (notesArray, i = 0) => {
    if (i < notesArray.length) {
      const note = notesArray[i];
      setActiveKey(note);
      handleKeyPlayed(note);
      timeoutRef.current = setTimeout(() => {
        playNotes(notesArray, i + 1);
      }, 1000);
    } else {
      setActiveKey();
    }
  };

  const handlePlayNotes = (notesArray) => {
    if (notesArray) {
      playNotes(notesArray);
    }
  };
  const handleClearLog = () => {
    dispatchLogAction({ type: 'CLEAR_LOG_ENTRIES' });
  };

  return (
    <main>
      <Keyboard activeKey={activeKey} onKeyPlayed={handleKeyPlayed} />
      {/* To showcase multiple keyboards working in sync*/}
      <Keyboard activeKey={activeKey} onKeyPlayed={handleKeyPlayed} />

      <Log logEntries={logEntries} clearLog={handleClearLog} />

      <Player playNotes={handlePlayNotes} />
    </main>
  );
}

export default App;
