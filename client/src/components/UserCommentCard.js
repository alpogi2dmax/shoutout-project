import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../context/user";
import { CommentContext } from "../context/comment";

function UserCommentCard({comment, onUpdateComments}) {

    const {user} = useContext(UserContext)
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
                <Link to={`/comments/${comment.id}`}>
                    <p>{comment.comment}</p>
                </Link>
            </div>
            <div className='shoutout-actions'>
                {/* <p> */}
                <p onClick={handleLikeClick}>
                    {/* <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="heart-icon"
                        width="16"  // Adjust size as needed
                        height="16"
                        style={{ marginRight: '8px', verticalAlign: 'middle' }}  // Optional styling
                    >
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg> */}
                    {comment.likes.length} Likes
                </p>
                <p>Reply</p>
            </div>
        </div>
    );
    
}

export default UserCommentCard