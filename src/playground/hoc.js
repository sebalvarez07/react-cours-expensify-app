/* Higher order compontents (HOC)
-  A component (HOC) that renders another component(s)
-  Reuse code
-  Render hijacking
-  Prop manipulation
-  Abstract state
*/

import React from 'react';
import ReactDOM from 'react-dom';

const Info = (props) => (
    <div>
        <h1>Info</h1>
        <p>The info is: {props.info}</p>
    </div>
) 

// Returns a new component - Keep capitalization as the argument will be a component
const withAdminWarning = (WrappedComponent) => {
    return (props) => (
        <div>
            {props.isAdmin && <p>This is private info, please don't share!</p>}

            {/* We can use the spread operator to pass down the props object */}
            {console.log(props)}
            <WrappedComponent {...props}/>
        </div>
    );
}

const requireAuthentication = (WrappedComponent) => {
    return (props) => (
        <div>
            {props.isAuthenticated ?  (
                    <WrappedComponent {...props} /> 
                ) : (
                    <p>Please Login to see information</p>
                )
            }
        </div>
    )
}

// Since we re returning a component we must keep the capitalization
const AdminInfo = withAdminWarning(Info);
const AuthInfo = requireAuthentication(Info);

// ReactDOM.render(<AdminInfo isAdmin={true} info={'this is some info'}/>, document.getElementById('app'));
ReactDOM.render(<AuthInfo isAuthenticated={false} info={'this is some info'}/>, document.getElementById('app'));