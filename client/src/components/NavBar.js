import { Link, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../context/user'
import { CommentContext } from '../context/comment'
import { UserPageContext } from '../context/userpage'


function NavBar() {

    const navigate = useNavigate()
    const { user, handleLogoutUser } = useContext(UserContext)
    const { handleLogoutComments } = useContext(CommentContext)
    const { handleLogoutUserPage } = useContext(UserPageContext)

    const handleLogOutClick = () => {
        handleLogoutUser()
        handleLogoutComments()
        handleLogoutUserPage()
        navigate('/')
    }

    return (
        <div>
            <h1>Shoutout Project!</h1>
            <nav>
                <Link className='button' to='/'>Home</Link>
                <Link className='button' to='/explore'>Explore</Link>
                {user ? (
                    <button className='button' onClick={handleLogOutClick}>Logout</button>
                ) : (
                    <Link className='button' to="/">
                        Login
                    </Link>
                )}
            </nav>
        </div>
    )
}

export default NavBar