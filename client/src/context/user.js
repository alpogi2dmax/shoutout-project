import React, { useState, useEffect } from 'react';

const UserContext = React.createContext()

function UserProvider({children}) {
    const [ user, setUser ] = useState(null)
    const [ comments, setComments ] = useState([])
    const [ replies, setReplies ] = useState([])
    const [ followers, setFollowers ] = useState([])
    const [ followed, setFollowed ] = useState([])

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
                setReplies(data.replies);
                setFollowers(data.followers);
                setFollowed(data.followed);
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
          setComments([])
          setReplies([])
          setFollowers([])
          setFollowed([])
        })
      }

    const handleCommentLike = (updatedComment) => {
        const updatedComments = comments.map(comment => comment.id === updatedComment.id ? updatedComment : comment)
        setComments(updatedComments)
    }

    const updateComments = (updatedComment) => {
        const updatedComments = comments.map(comment => comment.id === updatedComment.id ? updatedComment : comment)
        setComments(updatedComments)
    }

    const addComments = (comment) =>  {
        setComments([comment, ...comments])
    }

    const addReplies = (reply) => {
        setReplies([reply, ...replies])
    }

    const deleteComments = (deletedComment) => {
        fetch(`/comments/${deletedComment.id}`, {
            method: "DELETE",
        })
        .then(() => {
            setComments(comments.filter(comment => comment.id !== deletedComment.id))
        })
    }

    const handleReplyLike = (updatedReply) => {
        const updatedReplies = replies.map(reply => reply.id === updatedReply.id ? updatedReply : reply)
        setReplies(updatedReplies)
        const targetComment = comments.find(comment => comment.id === updatedReply.comment.id)
        const updatedComment = {
            ...targetComment,
            replies: updatedReplies
        }
        const updatedComments = comments.map(comment => comment.id === updatedComment.id ? updatedComment : comment)
        setComments(updatedComments)
    }

    const deleteReplyUser = (deletedReply) => {
        const updatedReplies = replies.filter(reply => reply.id !== deletedReply.id)
        setReplies(updatedReplies)
        const targetComment = comments.find(comment => comment.id === deletedReply.comment.id)
        const updatedComment = {
            targetComment,
            replies: updatedReplies
        }
        const updatedComments = comments.map(comment => comment.id === updatedComment.id ? updatedComment : comment)
        setComments(updatedComments)
    }

    return (
        <UserContext.Provider value={{ user, setUser, handleLogoutUser, comments, handleCommentLike, addComments, deleteComments, replies, handleReplyLike, addReplies, updateComments, deleteReplyUser, followers, followed, setFollowed }}>
            {children}
        </UserContext.Provider>
    )
}



export { UserContext, UserProvider}