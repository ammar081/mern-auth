import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [userInfo, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      console.log("res: ", res);
      dispatch(setCredentials({ ...res.user }));
      toast.success(res.message);
      navigate("/");
    } catch (err) {
      toast.error(err?.data?.message || err?.error);
      console.log("error: ", err?.data?.message || err?.error);
    }
  };
  return (
    <div className="min-h-screen flex items-start justify-center pt-16 bg-gray-200">
      <div className="bg-white px-8 py-12 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        <form onSubmit={submitHandler}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-600"
            >
              Email
            </label>
            <input
              required
              type="email"
              id="email"
              name="email"
              className="mt-1 p-2 w-full border rounded-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Password
            </label>
            <input
              required
              type="password"
              id="password"
              name="password"
              className="mt-1 p-2 w-full border rounded-md"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {isLoading && <Loader />}
          <div className="flex flex-col items-start justify-between gap-4">
            <button
              disabled={isLoading}
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md disabled:bg-blue-200"
            >
              Login
            </button>
            <a href="#" className="text-sm ">
              Don't have an account?{" "}
              <Link to="/register">
                <span className="text-blue-500 font-semibold">Register</span>
              </Link>
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
