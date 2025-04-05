import CommentCard from "./CommentCard"
import { useContext, useEffect } from "react"
import { UserContext } from "../context/user"
import { CommentContext } from "../context/comment"
import './App.css'

function CommentList() {

    const { user } = useContext(UserContext)
    const { comments, setComments } = useContext(CommentContext)

    useEffect(() => {
        if (user) {
            fetch('/comments')
            .then(r => r.json())
            .then(data => setComments(data))
        }
    }, [])

    return (
        <div>
            {comments.map(comment => (
                <CommentCard key={comment.id} comment={comment} user={user}/>
            ))}
        </div>
        
    )

}

export default CommentList