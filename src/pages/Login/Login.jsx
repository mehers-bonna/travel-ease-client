import React, { use, useState } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from '../../Context/AuthContext';
import { Link, useLocation, useNavigate } from 'react-router';
import { FcGoogle } from "react-icons/fc";

const Login = () => {
    const [error, setError] = useState('');
    const { signInUser, signInWithGoogle } = use(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();

    // Demo User Login Function
    const handleDemoUserLogin = () => {
        const email = "test1@gmail.com"; 
        const password = "Test1@gmail.com";

        signInUser(email, password)
            .then((result) => {
                toast.success('Logged in with Demo User account.');
                console.log(result.user);
                navigate(location.state || "/");
            })
            .catch((err) => {
                toast.error("Demo login failed. Check console for details.");
                console.log(err);
            });
    };

    const handleLogIn = (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        const passwordPattern = /^(?=.*[a-z])(?=.*[!@#$%^&*]).{6,}$/;

        if (!passwordPattern.test(password)) {
            setError('Password must have at least 1 lowercase letter, 1 special character, and be at least 6 characters long.');
            return;
        }

        signInUser(email, password)
            .then((result) => {
                toast.success('You Logged in Successfully.');
                console.log(result.user);
                event.target.reset();
                navigate(location.state || "/");
            })
            .catch((err) => {
                console.log(err);
                setError("Invalid email or password. Please try again.");
            });
    };

    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then((result) => {
                console.log(result.user);
                toast.success('Google Login Successful.');
                navigate(location?.state || "/");
            })
            .catch((err) => {
                console.log(err);
                toast.error("Google login failed.");
            });
    };

    return (
        <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl border border-gray-200 my-10">
            <div className="card-body">
                <h1 className="text-3xl font-bold text-center">Login Your Account</h1>
                
                {/* Demo User Button */}
                <div className="mt-4">
                    <button 
                        onClick={handleDemoUserLogin} 
                        className="btn btn-outline btn-error w-full rounded-full normal-case"
                    >
                        Click for Demo User Login
                    </button>
                </div>

                <div className="divider text-xs text-gray-400">OR USE CREDENTIALS</div>

                <form onSubmit={handleLogIn}>
                    <fieldset className="fieldset">
                        <label className="label">Email</label>
                        <input
                            type="email"
                            name="email"
                            className="input rounded-full focus:border-0 focus:outline-gray-200 w-full"
                            placeholder="Email"
                            required
                        />
                        <label className="label">Password</label>
                        <input
                            type="password"
                            name="password"
                            className="input rounded-full focus:border-0 focus:outline-gray-200 w-full"
                            placeholder="Password"
                            required
                        />
                        {error && <p className="text-red-600 text-xs mt-1">{error}</p>}
                        <div className="mt-1">
                            <a className="link link-hover text-xs">Forgot password?</a>
                        </div>
                        <button type="submit" className="btn text-white mt-4 rounded-full bg-error w-full">
                            Login
                        </button>
                    </fieldset>
                </form>

                <div className="divider text-xs text-gray-400">OR SOCIAL LOGIN</div>

                <button
                    onClick={handleGoogleSignIn}
                    className="btn bg-white rounded-full text-black border-[#e5e5e5] w-full"
                >
                    <FcGoogle className="text-xl" />
                    Login with Google
                </button>
                
                <p className="text-center mt-6 text-sm">
                    New to our website? Please{" "}
                    <Link className="text-red-700 font-bold hover:underline" to="/auth/register">
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;