import { createContext } from "react";

import { useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userEmail, setUserEmail] = useState(null);
    const [userDisplayName, setUserDisplayName] = useState(null);
    const [isLoggedIn , setIsLoggedIn] = useState(false);

    return (
        <AuthContext.Provider value={{ userEmail, setUserEmail, userDisplayName, setUserDisplayName, isLoggedIn, setIsLoggedIn }}>{children}</AuthContext.Provider>
    );
};

export default AuthContext;