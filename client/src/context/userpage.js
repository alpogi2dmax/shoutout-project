import React, { useState, useEffect } from 'react';

const UserPageContext = React.createContext()

function UserPageProvider({children}) {
    const [ userPage, setUserPage ] = useState(null)

    const updateUserPage = (newUserPage) => {
        setUserPage(newUserPage)
    }

    
const handleLogoutUserPage = () => {
    setUserPage(null)
}

    return (
        <UserPageContext.Provider value={{ userPage, updateUserPage, handleLogoutUserPage }}>
            {children}
        </UserPageContext.Provider>
    )
}


export { UserPageContext, UserPageProvider }