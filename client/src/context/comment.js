import React, { useState, useEffect } from 'react';

const CommentContext = React.createContext()

function CommentProvider({children}) {
    const [ comments, setComments] = useState([])

    useEffect(() => {
        fetch('/comments')
        .then(r => r.json())
        .then(data => setComments(data))
    }, [])

    return (
        <CommentContext.Provider value={{comments, setComments}}>
            {children}
        </CommentContext.Provider>
    )
}

export { CommentContext, CommentProvider}