import { useEffect, useState } from "react"
import { useParams, Link, useNavigate, Outlet } from "react-router-dom"
import UserNavBar from "./UserNavBar"

function UserPage() {

    const { id } = useParams()

    const [ user, setUser ] = useState('')
    const navigate = useNavigate()

    console.log(user)

    useEffect(() => {
        fetch(`/users/${id}`)
        .then(r => r.json())
        .then(data => {
            setUser(data)
            navigate(`/users/${id}/comments`, { state: { user: data } });
        })
    }, [id, navigate])

    return (
        <div>
            <img className='user-profile-pic' src={user.profile_pic} />
            <p>{user.first_name} {user.last_name}</p>
            {user && <UserNavBar user={user}/>}
            <Outlet />
        </div>
    )
}

export default UserPage