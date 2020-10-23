export type UserList = {
  id: number;
  name: string;
  email: string;
  phone: string;
  image: string;
  address: {
    street: string;
    city: string;
  };
  company: {
    name: string;
    catchPhrase: string;
  };
};
export type UserPhoto = {
  userImageURL: string;
};

export type UsersList = UserList[];
export type UsersPhoto = { hits: UserPhoto[] };
export type HttpErrorType = { stack: string };

export const USER_LIST_START_FETCHING = 'USER_LIST_START_FETCHING';
type UserListStartFetchingAction = {
  type: typeof USER_LIST_START_FETCHING;
};

export const USER_LIST_STOP_FETCHING = 'USER_LIST_STOP_FETCHING';
type UserListStopFetchingAction = {
  type: typeof USER_LIST_STOP_FETCHING;
};

export const USER_LIST_SUCCESS_FETCHING =
  'USER_LIST_SUCCESS_FETCHING';
export type UserListSuccessFetchingAction = {
  type: typeof USER_LIST_SUCCESS_FETCHING;
  payload: UsersList;
};

export const USER_LIST_ERROR_FETCHING = 'USER_LIST_ERROR_FETCHING';
export type UserListErrorFetchingAction = {
  type: typeof USER_LIST_ERROR_FETCHING;
  error: boolean;
  payload: HttpErrorType;
};

export const USER_LIST_ASYNC_FETCHING = 'USER_LIST_ASYNC_FETCHING';
type UserListAsyncFetchingAction = {
  type: typeof USER_LIST_ASYNC_FETCHING;
};

export type UserListActionTypes =
  | UserListStartFetchingAction
  | UserListStopFetchingAction
  | UserListErrorFetchingAction
  | UserListSuccessFetchingAction
  | UserListAsyncFetchingAction;
