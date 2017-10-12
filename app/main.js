import {Provider} from 'react-redux';
import App from './App';
import configureStore from 'modules/configureStore';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import React from 'react';
import ReactDOM from 'react-dom';
import {AppContainer} from 'react-hot-loader';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

/*
 * Create the global store that stores the application state. Components will
 * subscribe to data and changes that relate to this store.
 */
const store = configureStore();

/*
 * Export React for the debugging tools.
 */
if (process.env.NODE_ENV !== 'production') {
    window.React = React;
}

/*
 * Export the store for inspection while debugging.
 */
if (process.env.NODE_ENV !== 'production') {
    window.store = store;
}


/*
 * Theme
 */
const muiTheme = getMuiTheme({
    palette: {
        primary1Color: '#546E7A',
    },
});

/*
 * Mount the application to the DOM.
 */
const render = (Component) => {
    ReactDOM.render(
        <AppContainer>
            <Provider store={store}>
                <MuiThemeProvider muiTheme={muiTheme}>
                    <Component />
                </MuiThemeProvider>
            </Provider>
        </AppContainer>,
        document.getElementById('root')
    );
};

render(App);

/*
 * Enable support for hot-reloading the application.
 */
if (module.hot) {
    module.hot.accept('./App', () => {
        render(App);
    });
}
