// Core
import React, { FC, ReactElement } from 'react';
import Loader from 'react-loader-spinner';

// Styles
import { spinner } from './styles.module.scss';

export const Spinner: FC = (): ReactElement => (
  <div className={spinner}>
    <Loader type='Audio' color='#89a8ff' height={80} width={80} />
  </div>
);
