import axios from 'axios';
import { createContext, useState, useEffect } from 'react';

export const UserContext = createContext({})

export function UserContextProvider({ children }) {
    const [user, setUser] = useState(null);
    useEffect(() => {
        if (!user) {
            axios.get('http://localhost:5555/auth/profile')
            .then(({ data }) => {
                setUser(data)
            })
            .catch(error=>console.log(error))
        }
    }, [])

    return (
        <UserContext.Provider value={ user, setUser }>
            {children}
        </UserContext.Provider>
    )
}