// Core
import { SagaIterator } from 'redux-saga';
import { call, put, delay } from 'redux-saga/effects';

// Actions
import {
  startFetching,
  stopFetching,
  successFetching,
  errorFetching,
} from '../actions';

// Types
import { UsersPhoto, UsersList } from '../types';

// Api
import { api } from '../../../../api';

export function* userListWorker(): SagaIterator {
  try {
    yield put(startFetching());
    const results: UsersList = yield call(api.getUsers.fetch);
    const resultsPhotos: UsersPhoto = yield call(
      api.getUsersPhoto.fetch
    );

    const photos = resultsPhotos.hits.map(
      ({ userImageURL }) => userImageURL
    );

    const users = results.map((user, index) => {
      return {
        ...user,
        image: photos[index],
      };
    });

    yield delay(250);
    yield put(successFetching(users));
  } catch (error) {
    yield put(errorFetching(error));
  } finally {
    yield put(stopFetching());
  }
}
