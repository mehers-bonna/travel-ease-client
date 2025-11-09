import React, { use, useState } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from '../../Context/AuthContext';
import { Link, useLocation, useNavigate } from 'react-router';
import { FcGoogle } from "react-icons/fc";


const Login = () => {
    const [error, setError] = useState();
    const { signInUser, signInWithGoogle } = use(AuthContext);

  const location = useLocation();
  const navigate = useNavigate();
  console.log(location);

  const handleLogIn = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    const passwordPattern = /^(?=.*[a-z])(?=.*[!@#$%^&*]).{6,}$/;

    if (!passwordPattern.test(password)) {
      setError('Password must have at least 1 lowercase letter, 1 special character, and be at least 6 characters long.');
      return; 
    }

    console.log(email, password);
    signInUser(email, password)
      .then((result) => {
        toast.success('You Logged in Successfully.')
        console.log(result.user);
        event.target.reset();
        navigate(location.state || "/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        console.log(result.user);
        navigate(location?.state || "/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
    return (
        <div className="card bg-base-100  w-full mx-auto max-w-sm shrink-0 shadow-2xl border border-gray-200">
      <div className="card-body">
        <h1 className="text-3xl font-bold text-center">Login Your Account</h1>
        <form onSubmit={handleLogIn}>
          <fieldset className="fieldset">
               {/* email field */}
            <label className="label">Email</label>
            <input
              type="email"
              name="email"
              className="input rounded-full focus:border-0 focus:outline-gray-200"
              placeholder="Email"
            />
               {/* password field */}
            <label className="label">Password</label>
            <input
              type="password"
              name="password"
               className="input rounded-full focus:border-0 focus:outline-gray-200"
              placeholder="Password"
            />
            {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
            <div>
              <a className="link link-hover">Forgot password?</a>
            </div>
            <button className="btn text-white mt-4 rounded-full bg-error">
              Login
            </button>
          </fieldset>
        </form>

        <button
          onClick={handleGoogleSignIn}
          className="btn bg-white rounded-full text-black border-[#e5e5e5]"
        >
          <FcGoogle />
          Login with Google
        </button>
        <p className="text-center">
          New to our website? Please  <Link
            className="text-red-700 hover:underline"
            to="/auth/register"
          >
             Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;