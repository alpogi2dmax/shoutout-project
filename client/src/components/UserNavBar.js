import { Link, useParams } from "react-router-dom";

function UserNavBar({userPage}) {
    const { id } = useParams(); // Get user ID from URL params

    return (
        <div>
            <Link to={`/users/${id}/comments`}>{userPage.comments.length} Comments</Link>
            <Link to={`/users/${id}/replies`}>{userPage.replies.length} Replies</Link>
            <Link to={`/users/${id}/followers`}>{userPage.followers.length} Followers</Link>
            <Link to={`/users/${id}/following`}>{userPage.followed.length} Following</Link>
        </div>
    );
}

export default UserNavBar;