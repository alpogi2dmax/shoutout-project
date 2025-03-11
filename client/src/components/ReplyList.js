import ReplyCard from "./ReplyCard"

function ReplyList({replies}) {

    return (
        <div>
            <h4>Replies</h4>
            {replies.map(reply => (
                <ReplyCard key={reply.id} reply={reply}/>
            ))}
        </div>
    )
}

export default ReplyList