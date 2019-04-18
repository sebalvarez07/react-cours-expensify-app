import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLoginOut } from '../actions/auth';

export const Header = ({ startLoginOut }) => (
    <header>
        <h1>Expensify</h1>
        <ul>
            <li>
                <NavLink to="/dashboard" activeClassName="is-active">Home</NavLink>
            </li>
            <li>
                <NavLink to="/create" activeClassName="is-active">Create Expense</NavLink>
            </li>
            <li>
                <button onClick={startLoginOut}>logout</button>
            </li>
        </ul>
    </header>
);

const mapDispatchToProps = (dispatch) => {
    return {
        startLoginOut: () => dispatch(startLoginOut())
    }
}
 
export default connect(undefined, mapDispatchToProps)(Header);