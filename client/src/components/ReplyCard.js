import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/user";

function ReplyCard({reply, updateReplies, deleteReply}) {

    const { user, handleReplyLike, deleteReplyUser } = useContext(UserContext)

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
                handleReplyLike(updatedReply)
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
                handleReplyLike(updatedReply)
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
            deleteReplyUser(reply)
        })
    }

    return (
        <div className='reply-card'>
            <Link to={reply.replier.id === user.id ? '/user-settings' : `/users/${reply.replier.id}`}>
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
                    {reply.reply_likes.length}    {reply.reply_likes.map(like => like.reply_liker.id).includes(user.id) ? 
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="red" height='20' width='20'>
                            <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                        </svg>
                        :
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.0} stroke="currentColor" width='20' height='20'>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                        </svg>
                        }
                </p>
                
                {/* <p>Reply</p> */}
                {/* {reply.replier.id === user.id && <p onClick={handleDeleteClick}>Delete</p>} */}
                {reply.replier.id === user.id && 
                    <p>
                        <svg onClick={handleDeleteClick} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.0} stroke="currentColor" height='20' weight='20'>
                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>
                    </p>   
                }
            </div>
        </div>
    )
}

export default ReplyCard