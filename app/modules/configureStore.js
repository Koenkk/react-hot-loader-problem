import {createStore, applyMiddleware, compose} from 'redux';

import {enableBatching} from 'redux-batched-actions';

import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from 'redux-promise';
import ensureFSAMiddleware from '@meadow/redux-ensure-fsa';
import {createLogger} from 'redux-logger';

import reducer from './reducer';

/**
 * Configure the store for this application.
 *
 * This method create a new store that adds the Thunk and Promise middleware.
 * When development is toggled, it will also add middleware for checking if
 * actions are FSA-compliant and to add logging.
 *
 * @param {object} initialState Initial application state.
 * @return {Store} The configured store.
 */
export default function configureStore(initialState) {
    const listeners = [];

    const actionMiddleware = (store) => (next) => (action) => {
        if (action.type === 'LISTEN_ACTIONS') {
            listeners.push(action.payload);
        }

        const result = next(action);

        if (!action.meta || (action.meta && !action.meta.notify)) {
            listeners.forEach((listener) => listener(store, action, result));
        }

        return result;
    };

    const middlewares = [
        thunkMiddleware,
        promiseMiddleware,
        actionMiddleware,
    ];

    // Add some middleware in development only.
    if (process.env.NODE_ENV !== 'production') {
        middlewares.push(ensureFSAMiddleware({
            ignore: () => false,
        }));

        middlewares.push(createLogger({
            collapsed: true,
        }));
    }

    let middleware = applyMiddleware(...middlewares);

    // Add debug tools in development only.
    if (process.env.NODE_ENV !== 'production') {
        middleware = compose(
            middleware,
            window.devToolsExtension ? window.devToolsExtension() : (f) => f
        );
    }

    const store = createStore(
        enableBatching(reducer), initialState, middleware
    );

    // Enable hot reloading of root reducer.
    if (module.hot) {
        module.hot.accept('./reducer', () => {
            store.replaceReducer(enableBatching(reducer));
        });
    }

    return store;
}
