import React, { useState, useEffect } from 'react';

const CommentContext = React.createContext()

function CommentProvider({children}) {
    const [ comments, setComments] = useState([])

    useEffect(() => {
        fetch('/comments')
        .then(r => r.json())
        .then(data => setComments(data))
    }, [])

    const handleLogoutComments = () => {
          setComments([])
      }

    const updateComments = (updatedComment) => {
        const updatedComments = comments.map(c =>
            c.id === updatedComment.id ? updatedComment : c
        )
        setComments(updatedComments)
    }

    const deleteComments = (commentId) => {
        setComments(comments.filter(comment => comment.id !== commentId))
    }

    return (
        <CommentContext.Provider value={{comments, setComments, handleLogoutComments, updateComments, deleteComments}}>
            {children}
        </CommentContext.Provider>
    )
}

export { CommentContext, CommentProvider}