import React, { useReducer, useState, useRef, useEffect } from 'react';
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
    timeoutRef.current = setTimeout(
      () => {
        if (i < notesArray.length) {
          const note = notesArray[i];
          setActiveKey(note);
          handleKeyPlayed(note);
          playNotes(notesArray, i + 1);
        } else {
          setActiveKey();
        }
      },
      i === 0 ? 0 : 1000
    );
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

      {/* TODO: handle tests with multiple usages */}
      {/* <Keyboard activeKey={activeKey} onKeyPlayed={handleKeyPlayed} /> */}
      <Log logEntries={logEntries} clearLog={handleClearLog} />

      <Player playNotes={handlePlayNotes} />
    </main>
  );
}

export default App;
