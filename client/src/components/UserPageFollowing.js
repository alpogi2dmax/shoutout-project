import { useContext } from "react"
import { UserPageContext } from "../context/userpage"
import { UserContext } from "../context/user"
import UserPageFollowingCard from "./UserPageFollowingCard"

function UserPageFollowing() {

    const { userPage } = useContext(UserPageContext)

    const { user } = useContext(UserContext)

    const filteredFollowing = userPage.followed.filter(followed => followed.id !== user.id)
    
    if (!userPage) return <div>...Loading</div>
    
    return (
        <div>
            <h2>Following</h2>
            {filteredFollowing.map(followed => (
                // <p key={followed.id}>{followed.first_name}</p>
                <UserPageFollowingCard key={followed.id} followedUserPage={followed} />
            ))}
        </div>
    )
    
}

export default UserPageFollowing