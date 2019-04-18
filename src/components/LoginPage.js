import React from 'react';
import { connect } from 'react-redux';
import { startLoginIn } from '../actions/auth';

export const LoginPage = ({startLoginIn}) => {
    return (
        <div>
            <h2>Login Page</h2>
            <button 
                onClick={startLoginIn}
                >
                Login
            </button>
        </div>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        startLoginIn: () => dispatch(startLoginIn())
    }
}

export default connect(undefined, mapDispatchToProps)(LoginPage);