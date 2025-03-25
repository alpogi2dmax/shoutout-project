import { useContext } from "react"
import { UserContext } from "../context/user"
import { useFormik } from "formik"
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

function UserSettingsEditProfile() {

    const { user, setUser } = useContext(UserContext)
    const navigate = useNavigate()
    
    const formSchema = yup.object().shape({
        username: yup.string().required("Must enter username").min(3, 'Must be more than 3 character').max(15, 'Must be less than 15 characters.'),
        email: yup.string().required("Must enter email address"),
        first_name: yup.string().required("Must enter first name").min(3, 'Must be more than 3 character').max(20, 'Must be less than 20 characters.'),
        last_name: yup.string().required("Must enter last name").min(3, 'Must be more than 3 character').max(20, 'Must be less than 20 characters.'),
        profile_pic: yup.string().required("Must enter profile picture")
    })
    
    const formik = useFormik({
            initialValues: {
                username: user.username || "",
                email: user.email || "",
                first_name: user.first_name || "",
                last_name: user.last_name || "",
                profile_pic: user.profile_pic || "",
            },
            validationSchema: formSchema,
            onSubmit: (values) => {
                fetch(`users/${user.id}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(values, null, 2),
                })
                .then((r) => r.json())
                .then((user) => {
                    setUser(user)
                    navigate('/user-settings')
                })
            },
        })

    if (!user) {return(<div>Loading...</div>)}
    
    return(
        <div className='editprofile-card'>
            <h2>Edit Profile</h2>
            <form onSubmit={formik.handleSubmit}>
                    <label>Username: </label>
                    <input type='text' name='username' id='username' value={formik.values.username} onChange={formik.handleChange} />
                    <p style={{color: "red" }}> {formik.errors.username}</p>
                    <label>Email: </label>
                    <input type='text' name='email' id='email' value={formik.values.email} onChange={formik.handleChange} />
                    <p style={{color: "red" }}> {formik.errors.email}</p>
                    <label>First Name: </label>
                    <input type='text' name='first_name' id='first_name' value={formik.values.first_name} onChange={formik.handleChange} />
                    <p style={{color: "red" }}> {formik.errors.first_name}</p>
                    <label>Last Name: </label>
                    <input type='text' name='last_name' id='last_name' value={formik.values.last_name} onChange={formik.handleChange} />
                    <p style={{color: "red" }}> {formik.errors.last_name}</p>
                    <label>Profile Picture: </label>
                    <input type='text' name='profile_pic' id='profile_pic' value={formik.values.profile_pic} onChange={formik.handleChange} />
                    <p style={{color: "red" }}> {formik.errors.profile_pic}</p>
                    <button className='button' type='submit'>Update Profile</button>
                </form>
        </div>
    )

}

export default UserSettingsEditProfile