import { useContext } from "react"
import { UserContext } from "../context/user"
import { CommentContext } from "../context/comment";
import { useFormik } from "formik"
import * as yup from "yup";

function CreateReply({comment, setComment}) {

    const { user } = useContext(UserContext)
    const { comments, setComments } = useContext(CommentContext)

    const formSchema = yup.object().shape({
        reply: yup.string().min(1, 'Must be more than 1 character').max(145, 'Must be less than 145 characters.'),
        created_date: yup.date()
    })

    const formik = useFormik({
        initialValues: {
            reply: "",
            created_date: "",
            comment_id: "",
            replier_id: ""
        },
        validationSchema: formSchema,
        onSubmit: (values, formHelpers) => {
            const { resetForm } = formHelpers
            values.created_date = new Date().toISOString();
            values.replier_id = user.id;
            values.comment_id = comment.id
            fetch("/replies", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(values, null, 2),
            })
            .then((r) => r.json())
            .then((newReply) => {
                const updatedComment = {
                    ...comment,
                    replies: [newReply, ...comment.replies]
                }
                const updatedComments = comments.map(c =>
                    c.id === updatedComment.id ? updatedComment : c
                )
                setComments(updatedComments)
                setComment(updatedComment)
                resetForm()
            })
        },
    })



    return(
        <div className = 'shoutout-card'>
            <div className='shoutout-header'>
                <img className='shoutout-pic' src={user.profile_pic}/>
                <form onSubmit={formik.handleSubmit}>
                    <textarea className='textarea-custom' type='textarea' name='reply' id='reply' value={formik.values.reply} placeholder="Post a reply" onChange={formik.handleChange} />
                    <p style={{color: "red" }}> {formik.errors.reply}</p>
                    <button type='submit'>Post</button>
                </form>
            </div>
        </div>
    )
}

export default CreateReply