// Core
import React, { FC, ReactElement } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';

// Components
import { SearchBar } from '../SearchBar';

// Route
import { book } from '../../routes/book';

// Styles
import styles from './styles.module.scss';

type RouteParams = {
  push: string;
  pathname: string;
};

type NavProps = RouteComponentProps<RouteParams>;

export const Nav: FC<NavProps> = (props: NavProps): ReactElement => {
  const {
    location: { pathname },
  } = props;

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        {pathname === book.root ? null : (
          <>
            <Link className={styles.navLink} to={book.root}>
              Home
            </Link>
          </>
        )}
        <SearchBar />
      </nav>
    </header>
  );
};
