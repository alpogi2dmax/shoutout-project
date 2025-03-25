import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../context/user";
import { CommentContext } from "../context/comment";

function UserCommentCard({comment, onUpdateComments}) {

    const {user, handleCommentLike} = useContext(UserContext)
    const {updateComments} = useContext(CommentContext)

    console.log(user)

    const createdDate = new Date(comment.created_date)

    const options = { month: 'long' };
    const month = new Intl.DateTimeFormat('en-US', options).format(createdDate);
    const day = createdDate.getDate();
    const year = createdDate.getFullYear();

    const formattedDate = `${month} ${day}, ${year}`

    console.log(comment.likes)

    const handleLikeClick = () => {
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
            updateComments(updatedComment)
            onUpdateComments(updatedComment)
            handleCommentLike(updatedComment)
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
                updateComments(updatedComment)
                onUpdateComments(updatedComment)
                handleCommentLike(updatedComment)
                
            })
        }
    }


    return (
        <div className='shoutout-card'>
             {/* <Link to={`users/${comment.user.id}`}> */}
                <div className='shoutout-header'>
                    <img className='shoutout-pic' src={comment.commenter.profile_pic} alt='Profile' />
                    <div className='user-info'>
                        <h2 className='user-name'>{comment.commenter.first_name} {comment.commenter.last_name}</h2>
                        <small className='shoutout-date'>{formattedDate}</small>
                    </div>
                </div>
            {/* </Link> */}
            <div className='shoutout-content'>
                <Link className='link-comment-style' to={`/comments/${comment.id}`}>
                    <p>{comment.comment}</p>
                </Link>
            </div>
            <div className='shoutout-actions'>
                <p onClick={handleLikeClick}>
                    {comment.likes.length}    {comment.likes.map(like => like.comment_liker.id).includes(user.id) ? 
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="red" height='20' width='20'>
                            <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                        </svg>
                        :
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.0} stroke="currentColor" width='20' height='20'>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                        </svg>
                        }
                </p>
                <Link className='link-comment-style' to={`/comments/${comment.id}`}>
                    <p>
                        {comment.replies.length}    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.0} stroke="currentColor" width='20' height='20'>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z" />
                        </svg>
                    </p>
                </Link>
                {/* <Link to={`/comments/${comment.id}`}>
                    <p>{comment.replies.length} Replies</p>
                </Link> */}
            </div>
        </div>
    );
    
}

export default UserCommentCard