

function UserReplyCard({reply}) {

    const createdDate = new Date(reply.created_date)

    const options = { month: 'long' };
    const month = new Intl.DateTimeFormat('en-US', options).format(createdDate);
    const day = createdDate.getDate();
    const year = createdDate.getFullYear();

    const formattedDate = `${month} ${day}, ${year}`

    return(
        <div className='reply-card'>
            <div className='reply-header'>
                <img className='reply-pic' src={reply.replier.profile_pic} alt='Profile' />
                <div className='user-info'>
                    <h2 className='user-name'>{reply.replier.first_name} {reply.replier.last_name}</h2>
                    <small className='reply-date'>{formattedDate}</small>
                </div>
            </div>
            <div className='reply-content'>
                <p>{reply.reply}</p>
            </div>
            <div className='reply-actions'>
                <p>
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
                <p>Reply</p>
            </div>
        </div>
    )
}

export default UserReplyCard