import React, { useReducer } from 'react';
import logo from './logo.svg';
import './App.css';
import Key from './components/Key';
import Keyboard from './components/Keyboard';
import Log from './components/Log';

export const logReducer = (state, action) => {
  if (action.type === 'ADD_LOG_ENTRY') {
    return [...state, { entry: action.entry, id: action.id }];
  }
  return state;
};

const logInitalState = [];

function App() {
  const [logEntries, dispatchAddLogEntry] = useReducer(
    logReducer,
    logInitalState
  );

  const handleKeyPlayed = (key) => {
    dispatchAddLogEntry({ type: 'ADD_LOG_ENTRY', entry: key, id: Date.now() });
  };

  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <Keyboard onKeyPlayed={handleKeyPlayed} />
      {/* TODO: handle tests with multiple usages */}
      {/* <Keyboard onKeyPlayed={handleKeyPlayed} /> */}
      <Log logEntries={logEntries} />
    </div>
  );
}

export default App;
