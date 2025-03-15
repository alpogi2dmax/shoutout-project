import React, { useState, useEffect } from 'react';

const UserPageContext = React.createContext()

function UserPageProvider({children}) {
    const [ userPage, setUserPage ] = useState(null)

    const updateUserPage = (newUserPage) => {
        setUserPage(newUserPage)
    }

    return (
        <UserPageContext.Provider value={{ userPage, updateUserPage }}>
            {children}
        </UserPageContext.Provider>
    )
}

export { UserPageContext, UserPageProvider }