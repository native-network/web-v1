import React from 'react';

import styles from './ProjectPollResults.css';

function ProjectPollResults({ options, quorum, support, memberCount }) {
  const allVotes = options.reduce((accumulator, value) => {
    accumulator.push(...value.votes);
    return accumulator;
  }, []);

  const supportVotes = options
    .filter(({ name }) => name === 'Approve')
    .map(({ votes }) => votes)
    .reduce((acc, val) => val);

  const allVoteCount = allVotes && allVotes.length;
  const supportVoteCount = supportVotes && supportVotes.length;

  const calculatePercentage = (value) => (supportVoteCount / value) * 100 || 0;

  const graphs = [
    {
      name: 'Quorum',
      value: quorum,
      percentage: calculatePercentage(memberCount),
    },
    {
      name: 'Support',
      value: support,
      percentage: calculatePercentage(allVoteCount),
    },
  ];

  return (graphs || []).map(({ name, value, percentage }, index) => {
    return (
      <div key={index} className={styles.ResultContainer}>
        <span
          style={{
            position: 'absolute',
            bottom: 'calc(100% + 3px)',
            left: `${value}%`,
            transform: 'translateX(-50%)',
          }}
        >
          {name}
        </span>
        <svg style={{ position: 'absolute', height: '2rem', width: '100%' }}>
          <line
            y1="0"
            y2="50"
            x1={`${value}%`}
            x2={`${value}%`}
            stroke="#000"
            strokeWidth="1px"
          />
        </svg>
        <svg
          className={styles.ResultSVG}
          viewBox="0 0 50 50"
          preserveAspectRatio="none"
        >
          <rect
            x="0"
            style={{ width: `${percentage}%` }}
            className={styles.QuorumMeter}
          />
        </svg>
      </div>
    );
  });
}

export default ProjectPollResults;
