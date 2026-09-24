import React from "react";
import styles from "./Login.module.css";

/**
 * Animated Vector Lock Component
 * @param {Object} props
 * @param {'idle' | 'submitting' | 'success' | 'error'} props.state
 */
export default function LoginLock({ state }) {
  return (
    <div 
      className={`${styles.lockContainer} ${styles[state]}`}
      aria-hidden="true"
    >
      <svg
        width="44"
        height="44"
        viewBox="0 0 44 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={styles.lockSvg}
      >
        {/* Glow halo filter representation */}
        <circle 
          cx="22" 
          cy="22" 
          r="18" 
          className={styles.lockHalo} 
        />

        {/* Shackle (top arch) */}
        <path
          d="M14 19V13.5C14 9.35786 17.3579 6 21.5 6C25.6421 6 29 9.35786 29 13.5V19"
          stroke="currentColor"
          strokeWidth="2.75"
          strokeLinecap="round"
          className={styles.shackle}
        />

        {/* Lock Body */}
        <rect
          x="10"
          y="18"
          width="24"
          height="19"
          rx="5"
          fill="currentColor"
          className={styles.lockBody}
        />

        {/* Keyhole (visible during idle/submitting/error) */}
        <g className={styles.keyholeGroup}>
          <circle cx="22" cy="26" r="2" fill="#FFFFFF" />
          <path
            d="M21 27.5L20.5 32H23.5L23 27.5Z"
            fill="#FFFFFF"
          />
        </g>

        {/* Success Checkmark (revealed on success) */}
        <path
          d="M16.5 27.5L20 31L27.5 23.5"
          stroke="#FFFFFF"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={styles.checkmarkPath}
        />
      </svg>
    </div>
  );
}