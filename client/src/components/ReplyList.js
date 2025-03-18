import ReplyCard from "./ReplyCard"

function ReplyList({replies, updateComment}) {

    const updateReplies = (updatedReply) => {
        const updatedReplies = replies.map(reply => reply.id === updatedReply.id ? updatedReply : reply)
        console.log(updatedReplies)
        updateComment(updatedReplies)
    }

    const deleteReply = (replyId) => {
        const updatedReplies = replies.filter(reply => reply.id !== replyId)
        updateComment(updatedReplies)
    }

    return (
        <div>
            <h4>Replies</h4>
            {replies.map(reply => (
                <ReplyCard key={reply.id} reply={reply} updateReplies={updateReplies} deleteReply={deleteReply}/>
            ))}
        </div>
    )
}

export default ReplyList