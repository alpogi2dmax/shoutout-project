import { useEffect, useState, useContext } from "react"
import { useParams, Link, useNavigate, Outlet } from "react-router-dom"
import { UserPageContext } from "../context/userpage"
import { UserContext } from "../context/user"
import UserNavBar from "./UserNavBar"

function UserPage() {

    const { id } = useParams()

    const { userPage, updateUserPage } = useContext(UserPageContext)
    const { user, setUser, followed, setFollowed } = useContext(UserContext)

    const isFollowing = userPage && userPage.followers.map(follower => follower.id).includes(user.id)

    console.log(isFollowing)

    // const [ userPage, setUser ] = useState('')
    const navigate = useNavigate()

    console.log(userPage)

    useEffect(() => {
        fetch(`/users/${id}`)
        .then(r => r.json())
        .then(data => {
            updateUserPage(data)
            navigate(`/users/${id}/comments`);
        })
    }, [id])

    const handleFollowClick = () => {
        let values = {
            follower_id: user.id,
            followed_id: userPage.id
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
            const newFollower = {
                id: user.id,
                first_name: user.first_name,
                last_name: user.last_name,
                profile_pic: user.profile_pic,
                username: user.username
            }
            const newFollowed = {
                id: userPage.id,
                first_name: userPage.first_name,
                last_name: userPage.last_name,
                profile_pic: userPage.profile_pic,
                username: userPage.username
            }
            const updatedUserPage = {
                ...userPage,
                followers: [...userPage.followers, newFollower]
            }
            const updatedFollowed = [newFollowed, ...followed]

            updateUserPage(updatedUserPage)
            setFollowed(updatedFollowed)
        })
    }

    const handleUnfollowClick = () => {
        const follow = {
            follower_id: user.id,
            followed_id: userPage.id
        }
        fetch('/follow_delete', {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(follow)
        })
        .then(() => {
            const updatedFollowers = userPage.followers.filter(follower => follower.id !== user.id)
            const updatedUserPage = {
                ...userPage,
                followers: updatedFollowers
            }
            const updatedFollowed = user.followed.filter(followed => followed.id !== userPage.id)
            const updatedUser = {
                ...user,
                followed: updatedFollowed
            }
            updateUserPage(updatedUserPage)
            setUser(updatedUser)
        })
    }

    if(!userPage) return  <div>Loading...</div>

    return (
        <div>
            <div className='userpage-card'>
                <img className='user-profile-pic' src={userPage.profile_pic} />
                <div className='userpage-info'>
                    <p>{userPage.first_name} {userPage.last_name}</p>
                    {!isFollowing ? <button className='button' onClick={handleFollowClick}>Follow</button> : <button className='button' onClick={handleUnfollowClick}>UnFollow</button>}
                </div>
                {/* <p>{userPage.first_name} {userPage.last_name}</p>
                {!isFollowing ? <button className='button' onClick={handleFollowClick}>Follow</button> : <button className='button' onClick={handleUnfollowClick}>UnFollow</button>} */}
            </div>
            {userPage && <UserNavBar userPage={userPage}/>}
            <Outlet />
        </div>
    )
}

export default UserPage