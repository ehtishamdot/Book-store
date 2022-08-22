import React, { useContext, useState } from "react";
import { Link, Route } from "react-router-dom";
import { AuthContext } from "../store/auth-context";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const AuthCtx = useContext(AuthContext);

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChangeUserNameHandler = (event) => {
    setEmail(event.target.value);
  };
  const onChangePasswordHandler = (event) => {
    setPassword(event.target.value);
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const inputData = {
      email,
      password,
    };
    console.log(inputData);
    const getUser = async () => {
      const rawResponse = await fetch("http://localhost:5000/api/v1/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...inputData }),
      });
      console.log(rawResponse);
      return await rawResponse.json();
    };
    const data = await getUser();
    AuthCtx.login(data.token);
    navigate("/bookstore");
  };
  return (
    <div
      className="flex justify-center item-center mt-40
    "
    >
      <form onSubmit={onSubmitHandler} className="p-2 shadow-xl">
        <h1 className="text-center mb-2">Login</h1>
        <input
          onChange={onChangeUserNameHandler}
          className="mb-2 block "
          type={"text"}
        ></input>
        <input
          onChange={onChangePasswordHandler}
          className="block mb-2"
          type={"password"}
        ></input>
        <button class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
          login
        </button>
      </form>
      <p>Don't have a account?</p>
      <Link to={`/signup`}>
        <button class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
          Signup
        </button>
      </Link>
    </div>
  );
};

export default Login;
