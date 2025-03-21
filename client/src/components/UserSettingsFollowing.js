import { useContext } from "react"
import { UserContext } from "../context/user"
import UserSettingsFollowedCard from "./UserSettingsFollowedCard";



function UserSettingsFollowing() {

    const { followed } = useContext(UserContext)

    if (!followed) return <p>Loading...</p>;

    console.log(followed)

    return (
        <div>
            {followed.map(f => (
                <UserSettingsFollowedCard key={f.id} followedUser={f} />
                // <p key={f.id}>{f.first_name}</p>
            ))}
        </div>
    )
}

export default UserSettingsFollowing