import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import ReplyList from "./ReplyList"
import CreateReply from "./CreateReply"

function CommentPage() {

    const { id } = useParams()

    const [comment, setComment] = useState(null)
    const [loading, setLoading] = useState(true)

    


    useEffect(() => {
        fetch(`/comments/${id}`)
        .then(r => r.json())
        .then(data => {
            setComment(data)
            setLoading(false)
        })
        .catch(error => {
            console.error('Fetch error:', error)
            setLoading(false)
        })
    }, [])

    if (loading) {
        return <p>Loading...</p>
    }

    const createdDate = new Date(comment.created_date)

    const options = { month: 'long' };
    const month = new Intl.DateTimeFormat('en-US', options).format(createdDate);
    const day = createdDate.getDate();
    const year = createdDate.getFullYear();

    const formattedDate = `${month} ${day}, ${year}`

    console.log(comment)

    return (
        <div>
            <div className='shoutout-card'>
                <div className='shoutout-header'>
                    <img className='shoutout-pic' src={comment.user.profile_pic} alt='Profile' />
                    <div className='user-info'>
                        <h2 className='user-name'>{comment.user.first_name} {comment.user.last_name}</h2>
                        <small className='shoutout-date'>{formattedDate}</small>
                    </div>
                </div>
                <div className='shoutout-content'>
                    <p>{comment.comment}</p>
                </div>
                <div className='shoutout-actions'>
                    <p>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="heart-icon"
                            width="16"  // Adjust size as needed
                            height="16"
                            style={{ marginRight: '8px', verticalAlign: 'middle' }}  // Optional styling
                        >
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                        Like
                    </p>
                    <p>Reply</p>
                </div>
            </div>
            <CreateReply comment={comment} setComment={setComment}/>
            <ReplyList replies={comment.replies}/>
        </div>
    )
}

export default CommentPage