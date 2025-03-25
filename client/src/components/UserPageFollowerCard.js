import { useContext } from "react"
import { UserContext } from "../context/user"
import { Link } from "react-router-dom"

function UserPageFollowerCard({follower}) {

    const { user, setUser, followed, setFollowed } = useContext(UserContext)

    const isFollowing = followed.map(f => f.id).includes(follower.id)

    const handleFollowClick = () => {
        let values = {
            follower_id: user.id,
            followed_id: follower.id
        }
        fetch("/follows", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(values, null, 2),
        })
        .then((r) => r.json())
        .then(() => {
            // const newFollower = {
            //     id: user.id,
            //     first_name: user.first_name,
            //     last_name: user.last_name,
            //     profile_pic: user.profile_pic,
            //     username: user.username
            // }
            const newFollowed = {
                id: follower.id,
                first_name: follower.first_name,
                last_name: follower.last_name,
                profile_pic: follower.profile_pic,
                username: follower.username
            }
            // const updatedUserPage = {
            //     ...userPage,
            //     followers: [...userPage.followers, newFollower]
            // }
            // const updatedUser = {
            //     ...user,
            //     followed: [...user.followed, newFollowed]
            // }

            // updateUserPage(updatedUserPage)
            setFollowed([newFollowed, ...followed])
        })
    }

    const handleUnfollowClick = () => {
        const follow = {
            follower_id: user.id,
            followed_id: follower.id
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
            const updatedFollowed = user.followed.filter(followed => followed.id !== follower.id)
            // const updatedUser = {
            //     ...user,
            //     followed: updatedFollowed
            // }
            // updateUserPage(updatedUserPage)
            setFollowed(updatedFollowed)
        })
    }
    
    return (
        <div className='follow-card'>
            <div className='follow-header'>
                <Link className='follower-link' to={`/users/${follower.id}`}>
                    <img className='follow-pic' src={follower.profile_pic} alt='Profile picture' />
                    <p className='follow-info'>{follower.first_name} {follower.last_name}</p>
                </Link>
                {!isFollowing ? <button className='button' onClick={handleFollowClick}>Follow</button> : <button className='button' onClick={handleUnfollowClick}>UnFollow</button>}
            </div>
        </div>
    )
}

export default UserPageFollowerCard