import { useContext, useEffect } from "react"
import { UserContext } from "../context/user"
import UserSettingsNavBar from "./UserSettingsNavBar"
import { Outlet, useNavigate } from "react-router-dom"

function UserSettings() {

    const { user } = useContext(UserContext)
    const navigate = useNavigate()

    useEffect(() => {
        // Redirect to 'user-comments' when UserSettings is accessed
        navigate('/user-settings/user-comments');
    }, [navigate]);

    console.log(user.first_name)

    return (
        <div>
            <img className='user-profile-pic' src={user.profile_pic} />
            <p>{user.first_name} {user.last_name}</p>
            <UserSettingsNavBar />
            <Outlet />
        </div>
    )
}

export default UserSettings