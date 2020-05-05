import React from 'react';
import PropTypes from 'prop-types';
import styles from './Log.module.scss';

export default function Log({ logEntries, clearLog }) {
  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <h3 id="log-label">Log</h3>
        <button disabled={!logEntries || !logEntries.length} onClick={clearLog}>
          Clear Log
        </button>
      </header>
      <ul aria-labelledby="log-label" className={styles.log}>
        {logEntries && logEntries.length ? (
          logEntries.map(({ entry, id }) => <li key={id}>{entry}</li>)
        ) : (
          <li>No log entries yet.</li>
        )}
      </ul>
    </section>
  );
}

Log.propTypes = {
  logEntries: PropTypes.array,
  clearLog: PropTypes.func,
};
