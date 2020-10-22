// Core
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

// Instruments
import { history } from './middleware';

const router = connectRouter(history);

export const rootReducer = combineReducers({
  router,
});

export type AppState = ReturnType<typeof rootReducer>;
