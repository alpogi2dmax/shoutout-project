import { Link, useParams } from "react-router-dom";

function UserNavBar({userPage}) {
    const { id } = useParams(); // Get user ID from URL params

    return (
        <div className='navbar-links'>
            <Link className='link-style' to={`/users/${id}/comments`}>{userPage.comments.length} Comments</Link>
            <Link className='link-style' to={`/users/${id}/replies`}>{userPage.replies.length} Replies</Link>
            <Link className='link-style' to={`/users/${id}/followers`}>{userPage.followers.length} Followers</Link>
            <Link className='link-style' to={`/users/${id}/following`}>{userPage.followed.length} Following</Link>
        </div>
    );
}

export default UserNavBar;