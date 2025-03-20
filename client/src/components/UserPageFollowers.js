import { useContext } from "react"
import { UserPageContext } from "../context/userpage"
import { UserContext } from "../context/user"
import UserPageFollowerCard from "./UserPageFollowerCard"

function UserPageFollowers() {

    const { userPage } = useContext(UserPageContext)
    const { user } = useContext(UserContext)

    const filteredFollowers = userPage.followers.filter(follower => follower.id !== user.id)

    if (!userPage) return <div>...Loading</div>

    return (
        <div>
            <h2>Followers</h2>
            {filteredFollowers.map(follower => (
                <UserPageFollowerCard key={follower.id} follower={follower} />
            ))}
        </div>
    )
}

export default UserPageFollowers