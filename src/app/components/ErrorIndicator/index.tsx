import React, { FC, ReactElement } from 'react';

import styles from './styles.module.scss';

export const ErrorIndicator: FC = (): ReactElement => (
  <div className={styles.errorIndicator}>
    <h2>Error</h2>
    <p>Something has gone terribly wrong</p>
    <p>(but we already try to fix it)</p>
  </div>
);
