import { useContext } from "react"
import { UserContext } from "../context/user"
import { Link } from "react-router-dom"

function UserSettingsNavBar() {

    const { comments, replies, user, followers, followed } = useContext(UserContext)

    return (
        <div>
            <Link to={'/user-settings/user-comments'}>{comments.length} Comments</Link>
            <Link to={'/user-settings/user-replies'}>{replies.length} Replies</Link>
            <Link to={'/user-settings/user-followers'}>{followers.length} Followers</Link>
            <Link to={'/user-settings/user-following'}>{followed.length} Following</Link>
        </div>
    )
}

export default UserSettingsNavBar