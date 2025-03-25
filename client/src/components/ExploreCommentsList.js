import ExploreCommentsCard from "./ExploreCommentsCard"
import { useState } from "react"

function ExploreCommentsList({comments, deleteComment}) {


    return (
        <div>
            {comments.map(comment => (
                <ExploreCommentsCard key={comment.id} comment={comment} deleteComment={deleteComment}/>
            ))}
        </div>
    )
}

export default ExploreCommentsList