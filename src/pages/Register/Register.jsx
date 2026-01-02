import React, { use } from 'react';
import { Link, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { AuthContext } from '../../Context/AuthContext';
import { FcGoogle } from "react-icons/fc";

const Register = () => {
    const { createUser, updateUserProfile, signInWithGoogle } = use(AuthContext);
    const navigate = useNavigate();

    const handleRegister = (event) => {
        event.preventDefault();
        const displayName = event.target.displayName.value;
        const photoURL = event.target.photoURL.value;
        const email = event.target.email.value;
        const password = event.target.password.value;

        // Form Validation (optional but recommended)
        if (password.length < 6) {
            toast.error("Password must be at least 6 characters.");
            return;
        }

        const loadingToast = toast.loading("Creating your account...");

        createUser(email, password)
            .then(async (result) => {
                console.log(result.user);
                await updateUserProfile(displayName, photoURL);
                toast.update(loadingToast, { render: "Account created successfully!", type: "success", isLoading: false, autoClose: 3000 });
                navigate("/");
            })
            .catch((error) => {
                console.log(error);
                toast.update(loadingToast, { render: error.message, type: "error", isLoading: false, autoClose: 3000 });
            });
    };

    const handleGoogleSignIn = () => {
        const loadingToast = toast.loading("Connecting to Google...");
        signInWithGoogle()
            .then((result) => {
                console.log(result.user);
                toast.update(loadingToast, { render: "Signed in successfully!", type: "success", isLoading: false, autoClose: 3000 });
                navigate("/");
            })
            .catch((error) => {
                console.log(error);
                toast.update(loadingToast, { render: error.message, type: "error", isLoading: false, autoClose: 3000 });
            });
    };

    return (
        <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl border border-gray-100 my-10">
            <div className="card-body">
                <h1 className="text-3xl font-bold text-center">Register Now!</h1>
                <form onSubmit={handleRegister}>
                    <fieldset className="fieldset">
                        <label className="label">Full Name</label>
                        <input
                            type="text"
                            name="displayName"
                            className="input rounded-full focus:border-0 focus:outline-gray-200 w-full"
                            placeholder="Enter your name"
                            required
                        />

                        <label className="label">Photo URL</label>
                        <input
                            type="text"
                            name="photoURL"
                            className="input rounded-full focus:border-0 focus:outline-gray-200 w-full"
                            placeholder="Paste photo link"
                            required
                        />

                        <label className="label">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            className="input rounded-full focus:border-0 focus:outline-gray-200 w-full"
                            placeholder="Enter email"
                            required
                        />

                        <label className="label">Password</label>
                        <input
                            type="password"
                            name="password"
                            className="input rounded-full focus:border-0 focus:outline-gray-200 w-full"
                            placeholder="Create password"
                            required
                        />

                        <button type='submit' className="btn text-white mt-6 rounded-full bg-error w-full">
                            Register
                        </button>
                    </fieldset>
                </form>

                <div className="divider text-xs text-gray-400">OR CONTINUE WITH</div>

                <button
                    onClick={handleGoogleSignIn}
                    className="btn bg-white rounded-full text-black border-[#e5e5e5] w-full"
                >
                    <FcGoogle className="text-xl" />
                    Sign up with Google
                </button>
                
                <p className="text-center mt-6 text-sm">
                    Already have an account? Please{" "}
                    <Link className="text-red-700 font-bold hover:underline" to="/auth/login">
                        Login
                    </Link>{" "}
                </p>
            </div>
        </div>
    );
};

export default Register;