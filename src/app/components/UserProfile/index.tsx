// Core
import React, { FC, ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

// Components
import { ErrorIndicator } from '../ErrorIndicator';

// Reducers
import { AppState } from '../../init/rootReducer';
import { UserListState } from '../../bus/UserList/reducer';

// Types
import { UserList } from '../../bus/UserList/types';

// Styles
import styles from './styles.module.scss';

type RouteParams = {
  userName: string;
};

type UserProfileProps = RouteComponentProps<RouteParams>;

export const currentUser = (
  user: UserList | undefined,
  matchParams: string
): UserList | boolean => {
  if (user === undefined) return false;
  return user.name.replace(/ /g, '-').toLowerCase() === matchParams;
};

export const UserProfile: FC<UserProfileProps> = (
  props: UserProfileProps
): ReactElement => {
  const { data } = useSelector<AppState, UserListState>(
    (state) => state.userList
  );

  const {
    match: { params },
  } = props;
  const { userName } = params;

  const user = data.find((users) => currentUser(users, userName));

  const renderProfile = (): ReactElement | boolean => {
    if (user) {
      const {
        name,
        email,
        phone,
        image,
        address: { city, street },
        company: { name: companyName, catchPhrase },
      } = user;

      return (
        <>
          <h2 className={styles.title}>
            Profile:&nbsp;
            {name}
          </h2>
          <div className={styles.listContainer}>
            <img className={styles.avatar} src={image} alt={name} />
            <div>
              <ul className={styles.listUser}>
                <li className={styles.listItem}>
                  <span className={styles.listItemDesc}>Name:</span>
                  &nbsp;
                  {name}
                </li>
                <li className={styles.listItem}>
                  <span className={styles.listItemDesc}>Email:</span>
                  &nbsp;
                  {email}
                </li>
                <li className={styles.listItem}>
                  <span className={styles.listItemDesc}>Phone:</span>
                  &nbsp;
                  {phone}
                </li>
              </ul>
            </div>
            <div>
              <h3 className={styles.listTitle}>Company</h3>
              <ul className={styles.listCompany}>
                <li className={styles.listItem}>
                  <span className={styles.listItemDesc}>Name:</span>
                  &nbsp;
                  {companyName}
                </li>
                <li className={styles.listItem}>
                  <span className={styles.listItemDesc}>
                    Catch phrase:
                  </span>
                  &nbsp;
                  {catchPhrase}
                </li>
              </ul>
            </div>
            <div>
              <h3 className={styles.listTitle}>Address</h3>
              <ul className={styles.listAddress}>
                <li className={styles.listItem}>
                  <span className={styles.listItemDesc}>City:</span>
                  &nbsp;
                  {city}
                </li>
                <li className={styles.listItem}>
                  <span className={styles.listItemDesc}>Street:</span>
                  &nbsp;
                  {street}
                </li>
              </ul>
            </div>
          </div>
        </>
      );
    }
    return false;
  };

  const UserProfileJSX = user ? renderProfile() : <ErrorIndicator />;

  return (
    <section className={styles.profile}>
      <div className={styles.wrap}>{UserProfileJSX}</div>
    </section>
  );
};
