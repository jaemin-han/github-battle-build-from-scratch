var React = require('react');
// var Link = require('react-router-dom').Link
var NavLink = require('react-router-dom').NavLink;

funtion Nav() {
    return (
        <ul className='nav'>
            <li>
                <NavLink activeClassName='active' to='/'>
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink activeClassName='active' to='/battle'>
                    Battle
                </NavLink>
            </li>
            <li>
                <NavLink activeClassName='active' to='/popular'>
                    Popular
                </NavLink>
            </li>

        </ul>
    )
};

module.exports = Nav;