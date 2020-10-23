// Core
import { SagaIterator } from 'redux-saga';
import { call, all, takeEvery } from 'redux-saga/effects';

// Types
import { USER_LIST_ASYNC_FETCHING } from '../types';

// Workers
import { userListWorker } from './workers';

function* watchFetchUserList(): SagaIterator {
  yield takeEvery(USER_LIST_ASYNC_FETCHING, userListWorker);
}

export function* watchUserList(): SagaIterator {
  yield all([call(watchFetchUserList)]);
}
