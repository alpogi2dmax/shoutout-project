import React, { useState, useEffect } from 'react';
import { useContext } from 'react';
import { UserContext } from './user';

const CommentContext = React.createContext()

function CommentProvider({children}) {

    const { user } = useContext(UserContext)
    const [ comments, setComments] = useState([])

    useEffect(() => {
        if (user) {
            fetch('/comments')
            .then(r => r.json())
            .then(data => setComments(data))
        }
    }, [user])

    const handleLogoutComments = () => {
          setComments([])
      }

    const updateComments = (updatedComment) => {
        const updatedComments = comments.map(c =>
            c.id === updatedComment.id ? updatedComment : c
        )
        setComments(updatedComments)
    }

    const handleLike = (updatedComment) => {
        const updatedComments = comments.map(comment => comment.id === updatedComment.id ? updatedComment : comment)
        setComments(updatedComments)
    }

    const deleteComments = (commentId) => {
        setComments(comments.filter(comment => comment.id !== commentId))
    }

    const deleteComment = (deletedComment) => {
            setComments(comments.filter(comment => comment.id !== deletedComment.id))
    }

    const handleReplyLikeComment = (updatedReply) => {
        const targetComment = comments.find(comment => comment.id === updatedReply.comment.id)
        const updatedReplies = targetComment.replies.map(reply => reply.id === updatedReply.id ? updatedReply : reply)
        const updatedComment = {
            ...targetComment,
            replies: updatedReplies
        }
        const updatedComments = comments.map(comment => comment.id === updatedComment.id ? updatedComment : comment)
        setComments(updatedComments)
    }

    const deleteReplyComment = (deletedReply) => {
        const targetComment = comments.find(comment => comment.id === deletedReply.comment.id)
        const updatedReplies = targetComment.replies.filter(reply => reply.id !== deletedReply.id)
        const updatedComment = {
            targetComment,
            replies: updatedReplies
        }
        const updatedComments = comments.map(comment => comment.id === updatedComment.id ? updatedComment : comment)
        setComments(updatedComments)
    }

    // const replyLike = (likedReply) => {
    //     console.log(user)
    //     console.log(likedReply)
    //     if (likedReply.reply_likes.map(like => like.reply_liker.id).includes(user.id)) {
    //         const updatedLikes = likedReply.reply_likes.filter(like => like.reply_liker.id !== user.id)
    //         const updatedReply = {
    //             ...likedReply,
    //             reply_likes: updatedLikes
    //         }
    //         const targetComment = comments.find(comment => comment.id === likedReply.comment.id)
    //         const updatedReplies = targetComment.replies.map(reply => reply.id === updatedReply.id ? updatedReply : reply)
    //         const updatedComment = {
    //             ...targetComment,
    //             replies: updatedReplies
    //         }
    //         const updatedComments = comments.map(comment => comment.id === updatedComment.id ? updatedComment : comment)
    //         setComments(updatedComments)
    //     } else {
    //         const updatedLikes = {likedRepli}
    //     }
    // }

    return (
        <CommentContext.Provider value={{comments, setComments, handleLogoutComments, updateComments, deleteComments, deleteComment, handleLike, handleReplyLikeComment, deleteReplyComment }}>
            {children}
        </CommentContext.Provider>
    )
}

export { CommentContext, CommentProvider}