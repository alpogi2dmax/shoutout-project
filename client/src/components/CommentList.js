import CommentCard from "./CommentCard"
import './App.css'

function CommentList({comments}) {

    console.log(comments)

    return (
        <div>
            {comments.map(comment => (
                <CommentCard key={comment.id} comment={comment} />
            ))}
        </div>
        
    )

}

export default CommentList