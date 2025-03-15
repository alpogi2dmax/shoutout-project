// import { useLocation } from "react-router-dom"
import { useContext, useState } from "react"
import { UserPageContext } from "../context/userpage"
import UserCommentCard from "./UserCommentCard"

function UserCommentPage() {

    // const location = useLocation()
    // const { user, updateUser } = location.state || {}
    const { userPage, updateUserPage } = useContext(UserPageContext)
    const [comments, setComments] = useState(userPage.comments)

    const sortedComments = [...comments].sort((a, b) => {
        const dateA = new Date(a.created_date)
        const dateB = new Date(b.created_date)
        return dateB - dateA

    })

    const handleUpdateComments = (updatedComment) => {
        const updatedComments = comments.map(c =>
            c.id === updatedComment.id ? updatedComment : c
        )
        setComments(updatedComments)
        const updatedUser = {
            ...userPage, comments: updatedComments
        }
        updateUserPage(updatedUser)
    }



    return (

        <div>
            {sortedComments.map(comment => (
                <UserCommentCard key={comment.id} comment={comment} onUpdateComments={handleUpdateComments}/>
            ))}
        </div>
    )
}

export default UserCommentPage