import React from 'react';
import styles from './Tooltip.css';

const Tooltip = ({ message }) => {
  return (
    <div className={styles.tooltip}>
      <svg
        width="21px"
        height="20px"
        viewBox="0 0 21 20"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g
          id="Native"
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
        >
          <g
            id="2.PrivateCommunityTooltip"
            transform="translate(-937.000000, -393.000000)"
          >
            <g id="Group-7" transform="translate(938.000000, 393.000000)">
              <text
                id="?"
                fontFamily="LucidaGrande-Bold, Lucida Grande"
                fontSize="16"
                fontWeight="bold"
                letterpspacing="-0.6666666"
                fill="#4A4A4A"
              >
                <tspan x="6" y="16">
                  ?
                </tspan>
              </text>
              <circle
                id="Oval"
                stroke="#4A4A4A"
                fillRule="nonzero"
                cx="9.5"
                cy="10"
                r="9.5"
              />
            </g>
          </g>
        </g>
      </svg>
      <div className={styles.popper}>{message}</div>
    </div>
  );
};

export default Tooltip;
