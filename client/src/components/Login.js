import LoginForm from "./LoginForm"
// import SignUpForm from "./SignUpForm";
import React, { useEffect, useState } from "react";

function Login() {

    // const [showLogin, setShowLogin] = useState(true)

    return (
        <div>
            {/* {showLogin ? ( */}
                <>
                    <LoginForm />
                    {/* <br></br>
                    <p>
                        Don't have an account? &nbsp;
                        <button onClick={() => setShowLogin(false)}>
                            Sign Up
                        </button>
                    </p> */}
                </>   
            {/* ) : (
                <>
                    <SignUpForm />
                    <br></br>
                    <p>
                        Already have an account? &nbsp;
                        <button className='button-23' onClick={() => setShowLogin(true)}>
                            Log In
                        </button>
                    </p>
                </>
            )} */}
        </div>
    )
}

export default Login