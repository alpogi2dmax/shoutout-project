import { useContext } from "react"
import { UserContext } from "../context/user"
import { Link } from "react-router-dom"

function UserSettingsNavBar() {

    const { user } = useContext(UserContext)

    return (
        <div>
            <Link to={'/user-settings/user-comments'}>{user.comments.length} Comments</Link>
        </div>
    )
}

export default UserSettingsNavBar