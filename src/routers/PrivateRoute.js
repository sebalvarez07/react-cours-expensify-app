import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Header from '../components/Header';

export const PrivateRoute = ({
    isAuthenticated, 
    // Must change the name to capitalize first letter since we will be rendering this
    component: Component,
    // gives us access to the REST props inside the rest var ==> it knows which ones have been destructured already
    ...rest
    }) => (

        // See notes bellow to understand CB function is component
        <Route {...rest} component={(props) => (
            isAuthenticated ? (
                <div>
                    <Header />

                    { /* See notes below for syntax explanation */ }
                    <Component {...props} />
                </div>
                
            ) : (
                <Redirect to="/" />
            )
    )}/>
);

const mapStateToProps = (state) => ({
    isAuthenticated: !!state.auth.uid
});

export default connect(mapStateToProps)(PrivateRoute);

/*
    NOTES:

    component props. Analyze the following lines

    <Route path="/randPage" component={HomeButton}

    const HomeButton = (props) => {
        return (
            <button onClick={ () => props.history.push('/')}> 
                Go Home
            </button>
        );
    };

    See that what is passed inside component={} is basically a callBack function (or object with constructor)
    And the CB function gets the props arguments passed down by default
    That is why in the PrivateRoute code we must provide the {...props} and the reason why we can 
    get them, is because they are passed down automatically to any CB function.

*/