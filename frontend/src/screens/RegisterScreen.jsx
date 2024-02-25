import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../slices/usersApiSlice";
import { toast } from "react-toastify";
import { setCredentials } from "../slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { userInfo } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [register, { isLoading }] = useRegisterMutation();

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [userInfo, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Password do not match");
    } else {
      try {
        const res = await register({ name, email, password }).unwrap();
        console.log("res: ", res);
        dispatch(setCredentials({ ...res.user }));
        toast.success(res.message);
        navigate("/");
      } catch (err) {
        toast.error(err?.data?.message || err?.error);
        console.log("error: ", err?.data?.message || err?.error);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-start justify-center pt-16 bg-gray-200">
      <div className="bg-white px-8 py-12 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4">Register</h2>
        <form onSubmit={submitHandler}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-600"
            >
              Name
            </label>
            <input
              required
              type="text"
              id="name"
              name="name"
              className="mt-1 p-2 w-full border rounded-md"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
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
          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-600"
            >
              Confirm Password
            </label>
            <input
              required
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="mt-1 p-2 w-full border rounded-md"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          {isLoading && <Loader />}
          <div className="flex flex-col items-start justify-between gap-4">
            <button
              disabled={isLoading}
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md disabled:bg-blue-200"
            >
              Register
            </button>
            <a href="#" className="text-sm ">
              Already have an account?{" "}
              <Link to="/login">
                <span className="text-blue-500 font-semibold">Login</span>
              </Link>
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
