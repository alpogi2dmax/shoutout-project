import { useContext } from "react"
import { UserContext } from "../context/user"
import { CommentContext } from "../context/comment";
import { useFormik } from "formik"
import * as yup from "yup";

function CreateComment() {

    const { user } = useContext(UserContext)
    const { comments, setComments } = useContext(CommentContext)

    const formSchema = yup.object().shape({
        comment: yup.string().min(1, 'Must be more than 1 character').max(145, 'Must be less than 145 characters.'),
        created_date: yup.date()
    })

    const formik = useFormik({
        initialValues: {
            comment: "",
            created_date: "",
            commenter_id: ""
        },
        validationSchema: formSchema,
        onSubmit: (values, formHelpers) => {
            const { resetForm } = formHelpers
            values.created_date = new Date().toISOString();
            values.commenter_id = user.id;
            fetch("/comments", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(values, null, 2),
            })
            .then((r) => r.json())
            .then((comment) => {
                console.log(comment)
                setComments([comment, ...comments])
                resetForm()
            })
        },
    })

    return (
        <div className = 'shoutout-card'>
            <div className='shoutout-header'>
                <img className='shoutout-pic' src={user.profile_pic}/>
                <form onSubmit={formik.handleSubmit}>
                    <textarea className='textarea-custom' type='textarea' name='comment' id='comment' value={formik.values.comment} placeholder="What's happening..." onChange={formik.handleChange} />
                    <p style={{color: "red" }}> {formik.errors.comment}</p>
                    <button type='submit'>Post</button>
                </form>
            </div>
        </div>
    )
}

export default CreateComment