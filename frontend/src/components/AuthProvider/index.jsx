import { h, createContext } from "preact";
import { useState, useEffect } from "preact/hooks";

export const AUTH_PROVIDER_CONTEXT = createContext({
    account: null,
});

const AuthProvider = ({ children }) => {
    const [account, setAccount] = useState();

    useEffect(() => {
        fetch("/api/account").then(async (response) => {
            const data = await response.json();
        });
    }, []);

    return (
        <AUTH_PROVIDER_CONTEXT.Provider value={{ account }}>
            {children}
        </AUTH_PROVIDER_CONTEXT.Provider>
    );
};

export default AuthProvider;
