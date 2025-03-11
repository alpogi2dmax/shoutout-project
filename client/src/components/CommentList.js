import CommentCard from "./CommentCard"
import './App.css'

function CommentList({comments, user}) {

    console.log(comments)

    return (
        <div>
            {comments.map(comment => (
                <CommentCard key={comment.id} comment={comment} user={user}/>
            ))}
        </div>
        
    )

}

export default CommentList