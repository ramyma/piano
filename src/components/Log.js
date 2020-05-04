import React from 'react';

export default function Log({ logEntries }) {
  return (
    <section>
      <h3 id="log-label">Log</h3>
      <ul aria-labelledby="log-label">
        {logEntries.map(({ entry, id }) => (
          <li key={id}>{entry}</li>
        ))}
      </ul>
    </section>
  );
}
