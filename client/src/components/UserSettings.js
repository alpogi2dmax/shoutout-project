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
    }, [user, navigate]);


    if (!user) {return <div>Loading...</div>}

    const handleEditClick = () => {
        navigate('/user-settings-edit')
    }

    return (
        <div>
            <div className='userpage-card'>
                <img className='user-profile-pic' src={user.profile_pic} />
                <div className='userpage-info'>
                    <p>{user.first_name} {user.last_name}</p>
                    <button className='button' onClick={handleEditClick}>Edit</button>
                </div>
            </div>
            <UserSettingsNavBar />
            <Outlet />
        </div>
    )
}

export default UserSettings