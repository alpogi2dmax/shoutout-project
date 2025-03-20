import { useContext } from "react"
import { UserContext } from "../context/user"
import UserSettingsCommentCard from "./UserSettingsCommentCard"

function UserSettingsComments() {

    const { comments } = useContext(UserContext)

    return (
        <div>
            {comments.map(comment => (
                <UserSettingsCommentCard key={comment.id} comment={comment}/>
            ))}
        </div>
    )
}

export default UserSettingsComments