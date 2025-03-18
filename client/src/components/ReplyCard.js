import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/user";

function ReplyCard({reply, updateReplies, deleteReply}) {

    const { user } = useContext(UserContext)

    const createdDate = new Date(reply.created_date)

    const options = { month: 'long' };
    const month = new Intl.DateTimeFormat('en-US', options).format(createdDate);
    const day = createdDate.getDate();
    const year = createdDate.getFullYear();

    const formattedDate = `${month} ${day}, ${year}`

    console.log(reply)

    const handleClick = () => {
        if ((reply.reply_likes || []).map(x => x.reply_liker?.id).includes(user.id)) {
            const reply_like = reply.reply_likes.find(x => x.reply_liker.id === user.id)
            fetch(`/reply_likes/${reply_like.id}`, {
                method: "DELETE",
            })
            .then(() => {
                const updatedReply = {
                    ...reply,
                    reply_likes: reply.reply_likes.filter(x => x.reply_liker.id !== user.id)
                }
                console.log(updatedReply)
                updateReplies(updatedReply)
            })  
        } else {
            let values = {
                reply_liker_id: user.id,
                liked_reply_id: reply.id
            }
            fetch('/reply_likes', {
                method: 'POST',
                headers: {
                    'Content_type': 'application/json'
                },
                body: JSON.stringify(values, null, 2),
            })
            .then((r) => r.json())
            .then(reply_like => {
                const updatedReply = {
                    ...reply,
                    reply_likes: [...reply.reply_likes, reply_like]
                }
                updateReplies(updatedReply)
                
            })
        }
    }

    console.log(reply)
    
    const handleDeleteClick = () => {
        const replyId = reply.id
        fetch(`/replies/${replyId}`, {
            method: "DELETE",
        })
        .then(() => {
            deleteReply(replyId)
        })
    }

    return (
        <div className='reply-card'>
            <Link to={`/users/${reply.replier.id}`}>
                <div className='reply-header'>
                    <img className='reply-pic' src={reply.replier.profile_pic} alt='Profile' />
                    <div className='user-info'>
                        <h2 className='user-name'>{reply.replier.first_name} {reply.replier.last_name}</h2>
                        <small className='reply-date'>{formattedDate}</small>
                    </div>
                </div>
            </Link>
            <div className='reply-content'>
                <p>{reply.reply}</p>
            </div>
            <div className='reply-actions'>
                <p onClick={handleClick}>
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
                    {reply.reply_likes.length} Like
                </p>
                {/* <p>Reply</p> */}
                {reply.replier.id === user.id && <p onClick={handleDeleteClick}>Delete</p>}
            </div>
        </div>
    )
}

export default ReplyCard