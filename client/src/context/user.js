import React, { useState, useEffect } from 'react';

const UserContext = React.createContext()

function UserProvider({children}) {
    const [ user, setUser ] = useState(null)

    useEffect(() => {
        fetch('/checksession')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json()
        })
        .then(data => {
            if (data.session === null) {
                console.log('No active session');
            } else {
                setUser(data);
            }
        })
        .catch(error => console.log('Fetch error:', error));
    }, [])

    const handleLogout = () => {
        fetch(`/logout`, {
          method: "DELETE",
        })
        .then(() => {
          setUser(null)
        })
      }

    return (
        <UserContext.Provider value={{ user, setUser, handleLogout }}>
            {children}
        </UserContext.Provider>
    )
}

export { UserContext, UserProvider}