import { useContext } from "react"
import { UserContext } from "../context/user"
import { Link } from "react-router-dom"


function ExplorePeopleCard({person}) {

    const { user, followed, setFollowed } = useContext(UserContext)
    const isFollowing = followed.map(f => f.id).includes(person.id)

    const handleFollowClick = () => {
        let values = {
            follower_id: user.id,
            followed_id: person.id
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
            const newFollowed = {
                id: person.id,
                first_name: person.first_name,
                last_name: person.last_name,
                profile_pic: person.profile_pic,
                username: person.username
            }
            setFollowed([newFollowed, ...followed])
        })
    }

    const handleUnfollowClick = () => {
        const follow = {
            follower_id: user.id,
            followed_id: person.id
        }
        fetch('/follow_delete', {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(follow)
        })
        .then(() => {
            const updatedFollowed = user.followed.filter(followed => followed.id !== person.id)
            setFollowed(updatedFollowed)
        })
    }

    return(

        <div className='follow-card'>
            <div className='follow-header'>
                <Link className='follower-link' to={person.id === user.id ? `/user-settings` : `/users/${person.id}`}>
                    <img className='follow-pic' src={person.profile_pic} alt='Profile picture' />
                    <p className='follow-info'>{person.first_name} {person.last_name}</p>
                </Link>
                {!isFollowing ? <button className='button' onClick={handleFollowClick}>Follow</button> : <button className='button' onClick={handleUnfollowClick}>UnFollow</button>}
            </div>
        </div>
    )
}

export default ExplorePeopleCard