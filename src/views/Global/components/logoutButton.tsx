import React, {useState, useEffect, useContext} from "react";
import { AuthContext } from "../../../AuthProvider";
import { useHistory } from "react-router-dom";
import {fbAuth} from "../../../firebase";
import { Button } from "@material-ui/core";


const LogoutButton = () => {
    const history = useHistory();
    const authContext = useContext(AuthContext);
    const [loggedIn, setLoggedIn] = useState<boolean>(false);

    useEffect(() => {
        if(authContext.user) {
            console.log("Logged in");
            setLoggedIn(true);
        }
        else {
            console.log("Not Logged in");
            setLoggedIn(false);
        }
    }, [authContext.user]);

    const handleClick = (event: any) => {
        event.preventDefault();

        fbAuth
        .signOut()
        .then(() => {
            history.push("/auth/login");
        })
    }
    
    
    return (
       <Button color="primary" variant="outlined" onClick={handleClick}>Logout</Button>
    )
}

export default LogoutButton;