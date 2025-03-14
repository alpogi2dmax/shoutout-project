import { useLocation } from "react-router-dom"
import { useState } from "react"
import UserCommentCard from "./UserCommentCard"

function UserCommentPage() {

    const location = useLocation()
    const { user } = location.state || {}
    const [comments, setComments] = useState(user.comments)

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