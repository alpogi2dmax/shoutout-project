import { Link, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../context/user'


function NavBar() {

    const navigate = useNavigate()
    const { user, handleLogout } = useContext(UserContext)

    const handleLogOutClick = () => {
        handleLogout()
        navigate('/')
    }

    return (
        <div>
            <h1>Shoutout Project!</h1>
            <nav>
                <Link to='/'>Home</Link>
                {user ? (
                    <button onClick={handleLogOutClick}>Logout</button>
                ) : (
                    <Link to="/">
                        Login
                    </Link>
                )}
            </nav>
        </div>
    )
}

export default NavBar