import React from "react";

import styles from './Error.module.scss';

export interface ErrorProps {
  message: string;
}

export const Error = ({ message } : ErrorProps) => {
  return (
    <div className={styles.errorWrapper}>
      {`Error: ${message}`}
    </div>
  );
};
