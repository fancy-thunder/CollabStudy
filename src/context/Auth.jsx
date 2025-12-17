import { createContext } from "react";

import { useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userEmail, setUserEmail] = useState(null);
    const [userDisplayName, setUserDisplayName] = useState(null);
    const [isLoggedIn , setIsLoggedIn] = useState(false);
    const [userId, setUserId] = useState(null);

    return (
        <AuthContext.Provider value={{ userEmail, setUserEmail, userDisplayName, userId, setUserId,     setUserDisplayName, isLoggedIn, setIsLoggedIn    }}>{children}</AuthContext.Provider>
    );
};

export default AuthContext;