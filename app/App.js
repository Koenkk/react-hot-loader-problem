import {connect} from 'react-redux';
import React from 'react';

/**
 * App
 */
class App extends React.Component {
    render() {
        return(
            <div>
                React hot loader problem
            </div>
        )
    }
}

// Removing connect() solves the problem.
export default connect()(App);
