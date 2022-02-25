import React, { useEffect, useState } from "react";
import {fbAuth} from "./firebase";



export type ContextProps = {
    user: firebase.default.User | null;    
    authenticated: boolean;
    setUser: any;
    loadingAuthState: boolean;
};

export const AuthContext = React.createContext<Partial<ContextProps>>({});

export const AuthProvider = ({ children }: any) => {

    const [user, setUser] = useState(null as firebase.default.User | null);
    const [loadingAuthState, setLoadingAuthState] = useState(true);

    useEffect(() => {
        fbAuth.onAuthStateChanged((user: any) => {
            setUser(user);
            setLoadingAuthState(false);

            console.log(user !== null, 'ap authenticated');
        });
    }, []);


    return (
        <AuthContext.Provider 
            value={{
                user,
                authenticated: user !== null,
                setUser,
                loadingAuthState
            }}>
                {children}
        </AuthContext.Provider>
    );
}