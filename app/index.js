import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// var PropTypes = require('prop-types');
import App from './components/App';

// creating first react

// State
// Lifecycle Event
// UI


// class Badge extends React.Component {
//     render() {
//         return (
//             <div>
//                 <img 
//                     src={this.props.img}
//                     alt='Avatar'
//                     style={{width: 100, height: 100}}
//                 />
//                 <h1>Name: {this.props.name}</h1>
//                 <h3>username: {this.props.username}</h3>
//             </div>
//         )
//     }
// }

// Badge.propTypes = {
//     img: PropTypes.string.isRequired,
//     name: PropTypes.string.isRequired,
//     username: PropTypes.string.isRequired
// }


ReactDOM.render(
    <App />,
    // <Badge
    //     name='Jaemin'
    //     username='jaemin-han'
    //     img={'https://avatars3.githubusercontent.com/u/19918594?s=460&v=4'}
    // />,
    document.getElementById('app')
);