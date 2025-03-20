import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/user";

function UserSettingsCommentCard({comment}) {

    const { handleCommentLike } = useContext(UserContext)

    const createdDate = new Date(comment.created_date)

    const options = { month: 'long' };
    const month = new Intl.DateTimeFormat('en-US', options).format(createdDate);
    const day = createdDate.getDate();
    const year = createdDate.getFullYear();

    const formattedDate = `${month} ${day}, ${year}`

    const handleLikeClick = () => {
        handleCommentLike(comment)
    }
    
    return (
        <div>
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
                            <Link to={`/comments/${comment.id}`}>
                                <p>{comment.replies.length} Replies</p>
                            </Link>
                        </div>
                    </div>
        </div>
    )
}

export default UserSettingsCommentCard