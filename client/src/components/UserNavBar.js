import { Link, useParams } from "react-router-dom";

function UserNavBar({user}) {
    const { id } = useParams(); // Get user ID from URL params

    return (
        <div>
            <Link to={`/users/${id}/comments`} state={{user}}>Comments</Link>
            <Link to={`/users/${id}/replies`} state={{user}}>Replies</Link> 
        </div>
    );
}

export default UserNavBar;