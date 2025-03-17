// import { useLocation } from "react-router-dom"
import { useState, useContext } from "react"
import { UserPageContext } from "../context/userpage"
import UserReplyCard from "./UserReplyCard"

function UserReplyPage() {

    // const location = useLocation()
    //     const { user } = location.state || {}
    const { userPage, updateUserPage } = useContext(UserPageContext)
    const [replies, setReplies] = useState(userPage.replies)
    
        // const sortedComments = [...comments].sort((a, b) => {
        //     const dateA = new Date(a.created_date)
        //     const dateB = new Date(b.created_date)
        //     return dateB - dateA
    
        // })

    const handleUpdateReplies = (updatedReply) => {
        setReplies(replies.map(reply => reply.id === updatedReply.id ? updatedReply :reply))
        const newUserPage = {...userPage, replies: replies}
        updateUserPage(userPage)
    }

    return(
        <div>
            {replies.map(reply => (
                <UserReplyCard key={reply.id} reply={reply} handleUpdateReplies={handleUpdateReplies}/>
            ))}
        </div>
    )
}

export default UserReplyPage