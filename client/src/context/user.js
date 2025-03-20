import React, { useState, useEffect } from 'react';

const UserContext = React.createContext()

function UserProvider({children}) {
    const [ user, setUser ] = useState(null)
    const [ comments, setComments ] = useState([])

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
                setComments(data.comments);
            }
        })
        .catch(error => console.log('Fetch error:', error));
    }, [])

    const handleLogoutUser = () => {
        fetch(`/logout`, {
          method: "DELETE",
        })
        .then(() => {
          setUser(null)
        })
      }

    const handleCommentLike = (comment) => {
        console.log(comment)

        if ((comment.likes || []).map(x => x.comment_liker?.id).includes(user.id)) {
            const like = comment.likes.find(x => x.comment_liker.id === user.id)
            fetch(`/likes/${like.id}`, {
                method: "DELETE",
            })
            .then(() => {
            const updatedComment = {
                ...comment,
                likes: comment.likes.filter(x => x.comment_liker.id !== user.id)
            }
            const updatedComments = comments.map(comment => comment.id === updatedComment.id ? updatedComment : comment)
            setComments(updatedComments)
            })  
        } else {
            let values = {
                comment_liker_id: user.id,
                liked_comment_id: comment.id
            }
            fetch('/likes', {
                method: 'POST',
                headers: {
                    'Content_type': 'application/json'
                },
                body: JSON.stringify(values, null, 2),
            })
            .then((r) => r.json())
            .then(like => {
                const updatedComment = {
                    ...comment,
                    likes: [...comment.likes, like]
                }
                const updatedComments = comments.map(comment => comment.id === updatedComment.id ? updatedComment : comment)
                setComments(updatedComments)
                
            })
        }

    }

    return (
        <UserContext.Provider value={{ user, setUser, handleLogoutUser, comments, handleCommentLike }}>
            {children}
        </UserContext.Provider>
    )
}



export { UserContext, UserProvider}