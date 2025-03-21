import { useContext } from "react"
import { UserContext } from "../context/user"
import UserSettingsCommentCard from "./UserSettingsCommentCard"
import CreateComment from "./CreateComment"

function UserSettingsComments() {

    const { comments } = useContext(UserContext)

    if (!comments) {return <div>Loading...</div>}

    return (
        <div>
            <CreateComment />
            {comments.map(comment => (
                <UserSettingsCommentCard key={comment.id} comment={comment}/>
            ))}
        </div>
    )
}

export default UserSettingsComments