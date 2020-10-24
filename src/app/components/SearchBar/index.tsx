// Core
import React, {
  FC,
  ReactElement,
  useState,
  ChangeEvent,
} from 'react';
import { useDispatch } from 'react-redux';

// Actions
import { findUser } from '../../bus/filterUsers/actions';

// Styles
import styles from './styles.module.scss';

export const SearchBar: FC = (): ReactElement => {
  const [searchValue, setSearchValue] = useState('');
  const dispatch = useDispatch();

  const onSearchUserHandler = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    const { value } = event.target;

    setSearchValue(value.substring(0, 20));
    dispatch(findUser({ value }));
  };

  return (
    <input
      className={styles.searchBar}
      type='search'
      value={searchValue}
      placeholder='Search people by name...'
      onChange={onSearchUserHandler}
    />
  );
};
