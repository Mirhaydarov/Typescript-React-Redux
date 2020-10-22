// Core
import { createStore, applyMiddleware } from 'redux';

// Instruments
import { rootReducer } from './rootReducer';
import { rootSaga } from './rootSaga';
import { middleware, sagaMiddleware } from './middleware';

export const store = createStore(
  rootReducer,
  applyMiddleware(...middleware)
);

sagaMiddleware.run(rootSaga);
