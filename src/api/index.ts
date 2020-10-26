// Api
import { root, rootPhoto, photoApiKey, lengthPhoto } from './config';

// Types
import { UsersList, UsersPhoto } from '../app/bus/UserList/types';

type FetchDataType<T> = () => Promise<T>;

type APIFetchDataTypes = {
  getUsers: {
    fetch: FetchDataType<UsersList | Error>;
  };
  getUsersPhoto: {
    fetch: FetchDataType<UsersPhoto | Error>;
  };
};

export const api: APIFetchDataTypes = {
  getUsers: {
    fetch: (): Promise<UsersList | Error> =>
      fetch(`${root}/users`)
        .then((response) => response.json())
        .then((results: UsersList): UsersList => results)
        .catch((error: string) => new Error(error)),
  },
  getUsersPhoto: {
    fetch: (): Promise<UsersPhoto | Error> =>
      fetch(
        `${rootPhoto}/?key=${photoApiKey}&image_type=photo&per_page=${lengthPhoto}&safesearch=true`
      )
        .then((response) => response.json())
        .then((results: UsersPhoto): UsersPhoto => results)
        .catch((error: string) => new Error(error)),
  },
};
