import { useContext } from "react"
import { UserContext } from "../context/user"
import { CommentContext } from "../context/comment";
import { Link } from "react-router-dom";
import { useFormik } from "formik"
import * as yup from "yup";

function CreateComment() {

    const { user, addComments } = useContext(UserContext)
    const { comments, setComments } = useContext(CommentContext)

    const formSchema = yup.object().shape({
        comment: yup.string().min(2, 'Must be more than 1 character').max(145, 'Must be less than 145 characters.').required('Comment is required'),
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
                addComments(comment)
                resetForm()
            })
        },
    })

    return (
        <div className = 'shoutout-card'>
            <div className='shoutout-header'>
                <Link to={'user-settings'}>
                    <img className='shoutout-pic' src={user.profile_pic}/>
                </Link>
                <form onSubmit={formik.handleSubmit}>
                    <textarea style={{fontFamily: 'Arial, Helvetica, sans-serif'}} className='textarea-custom' type='textarea' name='comment' id='comment' value={formik.values.comment} placeholder="What's happening..." onChange={formik.handleChange} />
                    <p style={{color: "red" }}> {formik.errors.comment}</p>
                    <button className='button' type='submit'>Post</button>
                </form>
            </div>
        </div>
    )
}

export default CreateComment