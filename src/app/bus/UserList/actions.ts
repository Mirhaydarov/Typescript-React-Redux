import {
  USER_LIST_START_FETCHING,
  USER_LIST_STOP_FETCHING,
  USER_LIST_SUCCESS_FETCHING,
  USER_LIST_ERROR_FETCHING,
  USER_LIST_ASYNC_FETCHING,
  UserListActionTypes,
  UserListSuccessFetchingAction,
  UserListErrorFetchingAction,
  UsersList,
  HttpErrorType,
} from './types';

export function startFetching(): UserListActionTypes {
  return {
    type: USER_LIST_START_FETCHING,
  };
}

export function stopFetching(): UserListActionTypes {
  return {
    type: USER_LIST_STOP_FETCHING,
  };
}

export function successFetching(
  payload: UsersList
): UserListSuccessFetchingAction {
  return {
    type: USER_LIST_SUCCESS_FETCHING,
    payload,
  };
}

export function errorFetching(
  payload: HttpErrorType
): UserListErrorFetchingAction {
  return {
    type: USER_LIST_ERROR_FETCHING,
    error: false,
    payload,
  };
}

export function asyncFetching(): UserListActionTypes {
  return {
    type: USER_LIST_ASYNC_FETCHING,
  };
}
