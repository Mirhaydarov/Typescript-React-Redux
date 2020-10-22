// Core
import { Middleware } from 'redux';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { createBrowserHistory } from 'history';
import { routerMiddleware as createRouterMiddleware } from 'connected-react-router';

const logger = createLogger({
  duration: true,
  collapsed: true,
  diff: true,
  colors: {
    title: (action): string => (action.error ? '#ff0005' : '#1C5FAF'),
    prevState: (): string => '#1C5FAF',
    action: (): string => '#149945',
    nextState: (): string => '#fcff40',
    error: (): string => '#ff0005',
  },
});

const sagaMiddleware = createSagaMiddleware();
const history = createBrowserHistory();
const routerMiddleware = createRouterMiddleware(history);

const middleware: Middleware[] = [sagaMiddleware, routerMiddleware];

const devEnvironment = process.env.NODE_ENV === 'development';

if (devEnvironment) middleware.push(logger);

export { history, middleware, sagaMiddleware };
