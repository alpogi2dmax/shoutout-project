import { useContext } from "react"
import { UserContext } from "../context/user"


function UserPageFollowingCard({followedUserPage}) {

    const { user, setUser, followed, setFollowed } = useContext(UserContext)


    const isFollowing = followed.map(f => f.id).includes(followedUserPage.id)

    const handleFollowClick = () => {
        let values = {
            follower_id: user.id,
            followed_id: followedUserPage.id
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
                id: followedUserPage.id,
                first_name: followedUserPage.first_name,
                last_name: followedUserPage.last_name,
                profile_pic: followedUserPage.profile_pic,
                username: followedUserPage.username
            }
            // const updatedUserPage = {
            //     ...userPage,
            //     followers: [...userPage.followers, newFollower]
            // }
            const updatedFollowed = [newFollowed, ...followed]

            // updateUserPage(updatedUserPage)
            setFollowed(updatedFollowed)
        })
    }

    const handleUnfollowClick = () => {
        const follow = {
            follower_id: user.id,
            followed_id: followedUserPage.id
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
            const updatedFollowed = followed.filter(followed => followed.id !== followedUserPage.id)
            
            // updateUserPage(updatedUserPage)
            setFollowed(updatedFollowed)
        })
    }

    
    return (
        <div className='follow-card'>
            <div className='follow-header'>
                <img className='follow-pic' src={followedUserPage.profile_pic} alt='Profile picture' />
                <p className='follow-info'>{followedUserPage.first_name} {followedUserPage.last_name}</p>
                {!isFollowing ? <button className='button' onClick={handleFollowClick}>Follow</button> : <button className='button' onClick={handleUnfollowClick}>UnFollow</button>}
            </div>
        </div>
    )
}

export default UserPageFollowingCard