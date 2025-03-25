import { useContext } from "react"
import { UserContext } from "../context/user"
import { Link } from "react-router-dom"

function UserSettingsFollowedCard({followedUser}) {

    const { user, setUser, followed, setFollowed } = useContext(UserContext)

    const handleUnfollowClick = () => {
        const follow = {
            follower_id: user.id,
            followed_id: followedUser.id
        }
        fetch('/follow_delete', {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(follow)
        })
        .then(() => {
            // const updatedFollowers = userPage.followers.filter(follower => follower.id !== user.id)
            // const updatedUserPage = {
            //     ...userPage,
            //     followers: updatedFollowers
            // }
            const updatedFollowed = followed.filter(followed => followed.id !== followedUser.id)
            
            // updateUserPage(updatedUserPage)
            setFollowed(updatedFollowed)
        })
    }

    
    return (
        <div className='follow-card'>
            <div className='follow-header'>
                <Link className='follower-link' to={`/users/${followedUser.id}`}>
                    <img className='follow-pic' src={followedUser.profile_pic} alt='Profile picture' />
                    <p className='follow-info'>{followedUser.first_name} {followedUser.last_name}</p>
                </Link>
                <button className='button' onClick={handleUnfollowClick}>UnFollow</button>
            </div>
        </div>
    )

}

export default UserSettingsFollowedCard