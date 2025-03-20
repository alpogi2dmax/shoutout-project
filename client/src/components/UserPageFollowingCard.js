import { useContext } from "react"
import { UserContext } from "../context/user"


function UserPageFollowingCard({followed}) {

    const { user, setUser } = useContext(UserContext)


    const isFollowing = user.followed.map(f => f.id).includes(followed.id)

    const handleFollowClick = () => {
        let values = {
            follower_id: user.id,
            followed_id: followed.id
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
                id: followed.id,
                first_name: followed.first_name,
                last_name: followed.last_name,
                profile_pic: followed.profile_pic,
                username: followed.username
            }
            // const updatedUserPage = {
            //     ...userPage,
            //     followers: [...userPage.followers, newFollower]
            // }
            const updatedUser = {
                ...user,
                followed: [...user.followed, newFollowed]
            }

            // updateUserPage(updatedUserPage)
            setUser(updatedUser)
        })
    }

    const handleUnfollowClick = () => {
        const follow = {
            follower_id: user.id,
            followed_id: followed.id
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
            const updatedFollowed = user.followed.filter(followed => followed.id !== followed.id)
            const updatedUser = {
                ...user,
                followed: updatedFollowed
            }
            // updateUserPage(updatedUserPage)
            setUser(updatedUser)
        })
    }

    
    return (
        <div className='follow-card'>
            <div className='follow-header'>
                <img className='follow-pic' src={followed.profile_pic} alt='Profile picture' />
                <p className='follow-info'>{followed.first_name} {followed.last_name}</p>
                {!isFollowing ? <button onClick={handleFollowClick}>Follow</button> : <button onClick={handleUnfollowClick}>UnFollow</button>}
            </div>
        </div>
    )
}

export default UserPageFollowingCard