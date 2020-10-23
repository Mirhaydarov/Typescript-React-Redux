// Core
import React, { FC, ReactElement } from 'react';

// Components
import { Spinner } from '../../components/Spinner';
import { ErrorIndicator } from '../../components/ErrorIndicator';
import { UserListTile } from '../../components/UserListTile';

// Hooks
import { useUserListFetch } from './hooks/useUserListFetch';

// Styles
import styles from './styles.module.scss';

export const UserList: FC = (): ReactElement => {
  const { isFetching, data, error } = useUserListFetch();

  const ErrorMessageJSX = error && <ErrorIndicator />;
  const LoaderJSX = isFetching && <Spinner />;
  const UserListJSX = isFetching || <UserListTile data={data} />;

  return (
    <section className={styles.userList}>
      <div className={styles.wrap}>
        {LoaderJSX}
        {ErrorMessageJSX}
        {UserListJSX}
      </div>
    </section>
  );
};
