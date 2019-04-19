import React from 'react';
import { connect } from 'react-redux';
import { startLoginIn } from '../actions/auth';

export const LoginPage = ({startLoginIn}) => {
    return (
        
        <div className="box-layout">
            <div className="box-layout__box">
                <h1 className="box-layout__title">Expensify</h1>
                <p>It's time to get your expenses under control</p>
                <button 
                    className="btn btn--blue"
                    onClick={startLoginIn}
                    >
                    Login with Google
                </button>
            </div>
        </div>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        startLoginIn: () => dispatch(startLoginIn())
    }
}

export default connect(undefined, mapDispatchToProps)(LoginPage);