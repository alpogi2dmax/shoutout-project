import { useContext } from "react"
import { UserContext } from "../context/user"
import UserSettingsReplyCard from "./UserSettingsReplyCard"

function UserSettingsReplies() {

   // const location = useLocation()
    //     const { user } = location.state || {}
    const { replies } = useContext(UserContext)
    
        // const sortedComments = [...comments].sort((a, b) => {
        //     const dateA = new Date(a.created_date)
        //     const dateB = new Date(b.created_date)
        //     return dateB - dateA
    
        // })

    // const handleUpdateReplies = (updatedReply) => {
    //     setReplies(replies.map(reply => reply.id === updatedReply.id ? updatedReply :reply))
    //     const newUserPage = {...userPage, replies: replies}
    //     updateUserPage(userPage)
    // }

    return(
        <div>
            {replies.map(reply => (
                <UserSettingsReplyCard key={reply.id} reply={reply} />
            ))}
        </div>
    )
}

export default UserSettingsReplies