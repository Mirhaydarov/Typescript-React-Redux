import {
  USER_LIST_START_FETCHING,
  USER_LIST_STOP_FETCHING,
  USER_LIST_SUCCESS_FETCHING,
  USER_LIST_ERROR_FETCHING,
  USER_LIST_ASYNC_FETCHING,
  UserListActionTypes,
  UsersList,
  HttpErrorType,
} from './types';

export type UserListState = {
  data: UsersList;
  isFetching: boolean;
  error: boolean | HttpErrorType;
};

const initialState: UserListState = {
  data: [],
  isFetching: false,
  error: true,
};

export function userListReducer(
  state: UserListState = initialState,
  action: UserListActionTypes
): UserListState {
  switch (action.type) {
    case USER_LIST_START_FETCHING:
      return {
        ...state,
        isFetching: true,
        error: false,
      };

    case USER_LIST_STOP_FETCHING:
      return {
        ...state,
        isFetching: false,
      };

    case USER_LIST_SUCCESS_FETCHING:
      return {
        ...state,
        data: action.payload,
        error: false,
      };

    case USER_LIST_ERROR_FETCHING:
      return {
        ...state,
        error: action.payload,
      };

    case USER_LIST_ASYNC_FETCHING:
      return state;

    default:
      // eslint-disable-next-line no-case-declarations, @typescript-eslint/no-unused-vars
      const never: never = action;
  }
  return state;
}
