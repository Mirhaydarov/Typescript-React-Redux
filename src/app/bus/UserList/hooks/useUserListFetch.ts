// Core
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Instruments
import { normalize } from '../../../../utils';

// Actions
import { asyncFetching } from '../actions';

// Reducers
import { UserListState } from '../reducer';
import { FilterUsersState } from '../../filterUsers/reducer';
import { AppState } from '../../../init/rootReducer';

export function useUserListFetch(): UserListState {
  const dispatch = useDispatch();
  const { data, isFetching, error } = useSelector<
    AppState,
    UserListState
  >((state) => state.userList);

  const { value } = useSelector<AppState, FilterUsersState>(
    (state) => state.filterUsers
  );

  const filterData = data.filter((user) =>
    normalize(user.name).includes(normalize(value))
  );

  useEffect(() => {
    dispatch(asyncFetching());
  }, [dispatch]);

  return {
    data: filterData,
    isFetching,
    error,
  };
}
