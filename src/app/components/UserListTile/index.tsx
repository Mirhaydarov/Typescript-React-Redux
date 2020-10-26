// Core
import React, { FC, ReactElement, MouseEvent } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

// Instruments
import { normalize } from '../../../utils';

// Types
import { UsersList } from '../../bus/UserList/types';

// Route
import { book } from '../../routes/book';

// Styles
import styles from './styles.module.scss';

type RouteParams = {
  push: string;
};

type UserListTileProps = {
  data: UsersList;
};

type RootProps = RouteComponentProps<RouteParams> & UserListTileProps;

const UserListTile: FC<RootProps> = (
  props: RootProps
): ReactElement => {
  const {
    data,
    history: { push },
  } = props;

  const tableHeadTitle: string[] = [
    'Image',
    'Name',
    'Phone',
    'Email',
  ];

  const redirectToUserProfile = (userName: string): void =>
    push(`${book.profile}/${userName}`);

  function onClickRedirectHandler(
    event: MouseEvent<HTMLTableRowElement>,
    name: string
  ): void {
    const linkElement = event.target as HTMLInputElement;
    if (linkElement.matches('a')) return;

    redirectToUserProfile(normalize(name));
  }

  const TableHeadJSX =
    Array.isArray(data) && data.length ? (
      <thead className={styles.tableHead}>
        <tr>
          {tableHeadTitle.map((label) => (
            <th key={label}>{label}</th>
          ))}
        </tr>
      </thead>
    ) : null;

  const TableBodyJSX = data.map(
    ({ id, name, phone, email, image }): ReactElement => (
      <tbody key={id} className={styles.tableBody}>
        <tr
          onClick={(event: MouseEvent<HTMLTableRowElement>) =>
            onClickRedirectHandler(event, name)}
        >
          <td>
            <img
              className={styles.tableBodyImage}
              src={image}
              alt={name}
            />
          </td>
          <td>{name}</td>
          <td>
            <a
              className={styles.tableBodyPhone}
              href={`tel:+${phone}`}
            >
              {phone}
            </a>
          </td>
          <td>
            <a
              className={styles.tableBodyEmail}
              href={`mailto:${email}`}
            >
              {email}
            </a>
          </td>
        </tr>
      </tbody>
    )
  );

  return (
    <table className={styles.table}>
      {TableHeadJSX}
      {TableBodyJSX}
    </table>
  );
};

const UserListTileWrap = withRouter(UserListTile);

export { UserListTileWrap as UserListTile };
