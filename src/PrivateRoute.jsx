import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "./AuthProvider";

const PrivateRoute = ({ component: RouteComponent, ...rest}) => {
const {authenticated, loadingAuthState} = useContext(AuthContext);

return (
    <Route 
        {...rest}
        render={routeProps => 
            authenticated ? (
                <RouteComponent {...routeProps} />
            ) : (
                <Redirect to={{pathname: "/auth/login", state: {prevPath: rest.path}}} />
            )
        }
    />
  );
}

export default PrivateRoute