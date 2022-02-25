import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {fbAuth} from "../../../firebase";
import { AuthContext } from "../../../AuthProvider";

interface UserData {
    email: string;
    password: string;
}

const Login = () => {
    const authContext = useContext(AuthContext);
    
    const history = useHistory();
    const [values, setValues] = useState<UserData>({
        email: "",
        password: ""
    } as UserData);

    useEffect(() => {
        fbAuth.onAuthStateChanged((user: any) => {
            if(user !== null)
            {
                redirectToTargetPage();
            }
        });
    }, []);



    const redirectToTargetPage = () => {
        history.push("/dashboard");
    }


    const handleChange = (event: any) => {
        event.persist();
        setValues(values => ({
            ...values, 
            [event.target.name]: event.target.value
        }));
    }

    const handleSubmit = (event: any) => {
        event.preventDefault();

        fbAuth
        .signInWithEmailAndPassword(values.email, values.password)
        .then((res: any) => {
            authContext.setUser(res);
            console.log(res, 'res')
            history.push("/dashboard");
        })
        .catch((error: any) => {
            console.log(error.message);
            alert(error.message);
        });
    }

    return (
        <div className="row mt-4">
            <div className="offset-md-3 col-md-6">
                <form className="centered-text" onSubmit={handleSubmit}>
                    <input type="text" name="email" value={values.email} placeholder="Enter your Email" onChange={handleChange} /><br /><br />
                    <input type="password" name="password" value={values.password} placeholder="Enter your Password" onChange={handleChange} /><br /><br />
                    <button className="button">Login</button>
                </form>
            </div>
        </div>
    );
}

export default Login;