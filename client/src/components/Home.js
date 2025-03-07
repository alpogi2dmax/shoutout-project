import React, { useContext } from 'react';
import { CommentContext } from '../context/comment';
import CommentList from './CommentList';
import { UserContext } from '../context/user';
import Login from './Login';
import CreateComment from './CreateComment';

function Home() {
    
    const { comments } = useContext(CommentContext)

    const { user } = useContext(UserContext)

    if (user) {
        return (
            <div>
                <CreateComment />
                <CommentList comments={comments}/>
            </div>
        )
    } else {
        return (
            <div>
                <Login />
            </div>
        )
    }
    
}

export default Home