// Core
import { all } from 'redux-saga/effects';

// Watchers
import { watchUserList } from '../bus/UserList/saga/watchers';

export function* rootSaga(): Generator {
  yield all([watchUserList()]);
}
