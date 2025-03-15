import { Link, useParams } from "react-router-dom";

function UserNavBar({userPage}) {
    const { id } = useParams(); // Get user ID from URL params

    return (
        <div>
            <Link to={`/users/${id}/comments`}>Comments</Link>
            <Link to={`/users/${id}/replies`}>Replies</Link> 
        </div>
    );
}

export default UserNavBar;