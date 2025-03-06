import './App.css'

function CommentCard({comment}) {

    const createdDate = new Date(comment.created_date)

    const options = { month: 'long' };
    const month = new Intl.DateTimeFormat('en-US', options).format(createdDate);
    const day = createdDate.getDate();
    const year = createdDate.getFullYear();

    const formattedDate = `${month} ${day}, ${year}`

    console.log(formattedDate)

    return (
        <div className='tweet-card'>
            <div className='tweet-header'>
                <img className='profile-pic' src={comment.user.profile_pic} alt='Profile' />
                <div className='user-info'>
                    <h2 className='user-name'>{comment.user.first_name} {comment.user.last_name}</h2>
                    <small className='tweet-date'>{formattedDate}</small>
                </div>
            </div>
            <div className='tweet-content'>
                <p>{comment.comment}</p>
            </div>
        </div>
    );
    
}

export default CommentCard