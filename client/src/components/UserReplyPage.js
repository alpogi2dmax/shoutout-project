import { useLocation } from "react-router-dom"
import { useState } from "react"
import UserReplyCard from "./UserReplyCard"

function UserReplyPage() {

    const location = useLocation()
        const { user } = location.state || {}
        const [replies, setReplies] = useState(user.replies)
    
        // const sortedComments = [...comments].sort((a, b) => {
        //     const dateA = new Date(a.created_date)
        //     const dateB = new Date(b.created_date)
        //     return dateB - dateA
    
        // })

    return(
        <div>
            {replies.map(reply => (
                <UserReplyCard key={reply.id} reply={reply}/>
            ))}
        </div>
    )
}

export default UserReplyPage