var React = require('react');
var ReactDOM = require('react-dom');
require('./index.css');

// creating first react

// State
// Lifecycle Event
// UI
class App extends React.Component {
    render() {
        return (
            <div>
                Hello React World!
            </div>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
);