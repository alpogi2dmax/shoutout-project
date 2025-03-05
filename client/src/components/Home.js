import React, { useContext } from 'react';
import { CommentContext } from '../context/comment';

function Home() {
    
    const { comments } = useContext(CommentContext)

    console.log(comments)
    
    return (



        <div>Shoutout!</div>
    )
}

export default Home