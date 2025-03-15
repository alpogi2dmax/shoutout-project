import { useEffect, useState, useContext } from "react"
import { useParams, Link, useNavigate, Outlet } from "react-router-dom"
import { UserPageContext } from "../context/userpage"
import UserNavBar from "./UserNavBar"

function UserPage() {

    const { id } = useParams()

    const { userPage, updateUserPage } = useContext(UserPageContext)

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

    if(!userPage) return  <div>Loading...</div>

    return (
        <div>
            <img className='user-profile-pic' src={userPage.profile_pic} />
            <p>{userPage.first_name} {userPage.last_name}</p>
            {userPage && <UserNavBar userPage={userPage}/>}
            <Outlet />
        </div>
    )
}

export default UserPage