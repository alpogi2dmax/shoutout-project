import { useContext } from "react"
import { UserContext } from "../context/user"



function UserSettingsFollowing() {

    const { followed } = useContext(UserContext)

    return (
        <div>
            {followed.map(followed => (
                <p key={followed.id}>{followed.first_name} {followed.last_name}</p>
            ))}
        </div>
    )
}

export default UserSettingsFollowing