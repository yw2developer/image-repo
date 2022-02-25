import React, {useState, useEffect, useContext} from "react";
import { AuthContext } from "../../../AuthProvider";
import { useHistory } from "react-router-dom";
import {fbAuth} from "../../../firebase";


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
        <div>
            {loggedIn === true && <button className="button-border" onClick={handleClick}>Logout</button>}
        </div>   
    )
}

export default LogoutButton;