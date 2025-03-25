import { useContext } from "react"
import { UserContext } from "../context/user"
import { Link } from "react-router-dom"

function UserSettingsNavBar() {
  

    const { comments, replies, user, followers, followed } = useContext(UserContext)

    console.log(comments)

    return (
        <div className='navbar-links'>
            <Link className='link-style' to={'/user-settings/user-comments'}>{comments.length} Comments</Link>
            <Link className='link-style' to={'/user-settings/user-replies'}>{replies.length} Replies</Link>
            <Link className='link-style' to={'/user-settings/user-followers'}>{followers.length} Followers</Link>
            <Link className='link-style' to={'/user-settings/user-following'}>{followed.length} Following</Link>
        </div>
    )
}

export default UserSettingsNavBar


