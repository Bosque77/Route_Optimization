/* eslint-disable indent */
import React, { useState } from "react";
import front_page_logo from "../../../static/images/front_page_logo.png";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../../state";
import { LoginInfo } from "../../../../../shared/types";
import GoogleSignInButton from "./GoogleSignInButton";
import SignUpForm from "../SignUpForm/SignUpForm"

const SignInForm = () => {
  const dispatch = useDispatch();
  const { loginUser,showAlert } = bindActionCreators(actionCreators, dispatch);
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [signUpModalActive, setSignUpModalActive] = useState(false);


  const handleLogin = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const login_info: LoginInfo = { email, password };
    // eslint-disable-next-line no-debugger
    try {
      await loginUser(login_info);
      navigate("/");
    } catch (error) {
      console.log(error);
      showAlert(
        "Your email/password is either incorrect or has not been verified.",
        "error"
      );

    }
  };

  return (
    <>
      <div className="bg-white items-center px-12  py-6 rounded shadow">
        <h1 className="flex text-3xl font-bold my-8">
          Route Optimization Services
        </h1>
        <img src={front_page_logo} className="w-32 mx-auto my-8" />
        <p className="m-0 text-2xl leading-10 font-normal text-green-800"> Login to Your Account</p>
        <p className="font-euclid mb-4 text-lg font-bold text-gray-800 ">Don't have an account. <button onClick={() => navigate("/signup")} className="text-blue-600">Sign Up</button></p>
        <form
          className="flex flex-col items-center"
          method="post"
          onSubmit={(event) => handleLogin(event)}
        >
          <input
            className="w-64 border rounded-md border-gray-300 pl-2 pr-12 py-2 mt-2 focus:outline-none focus:border-indigo-500 focus:border-2  sm:text-sm text-left"
            type="text"
            name="user-name"
            id="user-name"
            placeholder="Username"
            onChange={({ target }) => setEmail(target.value)}
          />

          <input
            className="w-64 border rounded-md border-gray-300 pl-2 pr-12 py-2 mt-4 focus:outline-none focus:border-indigo-500 focus:border-2  sm:text-sm text-left"
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
          <button
            type="button"
            className="text-sm text-gray-500 mt-2 hover:text-black "
          >
            Forgot Password?
          </button>
          <button
            type="submit"
            className=" w-64 mt-6 py-2 px-4 bg-primary text-white rounded hover:bg-slate-900 active:scale-95"
          >
            Submit
          </button>

          {/* <GoogleSignInButton /> */}
          <div className="flex items-center justify-center my-4 w-64">
            <div className="border-t border-gray-200 w-64"></div>
            <div className="mx-4 text-gray-500">or</div>
            <div className="border-t border-gray-200 w-64"></div>
          </div>

          <GoogleSignInButton />
        </form>
      </div>
    </>
  );
};

export default SignInForm;
