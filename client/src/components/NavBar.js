import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../context/user'

function NavBar() {

    return (
        <div>
            <h1>Shoutout Project!</h1>
            <nav>
                <Link to='/'>Home</Link>
            </nav>
        </div>
    )
}

export default NavBar