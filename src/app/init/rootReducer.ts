// Core
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

// Reducers
import { userListReducer as userList } from '../bus/UserList/reducer';
import { filterUsersReducer as filterUsers } from '../bus/filterUsers/reducer';

// Instruments
import { history } from './middleware';

const router = connectRouter(history);

export const rootReducer = combineReducers({
  userList,
  filterUsers,
  router,
});

export type AppState = ReturnType<typeof rootReducer>;
