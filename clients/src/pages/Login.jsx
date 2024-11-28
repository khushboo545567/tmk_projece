import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";

const Login = function () {
  const navigate = useNavigate();
  const [loginValue, setLoginValue] = useState({
    email: "",
    password: "",
  });
  const handleChangeLogin = (e) => {
    const { name, value } = e.target;
    setLoginValue({ ...loginValue, [name]: value });
  };
  const handleSubmitLogin = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/login", loginValue,{ withCredentials: true })
      .then((res) => {
        toast.success("Logged in  successfully",{
          autoClose: 1000,
        });
        navigate("/task");
      })
      .catch((err) => {
        console.error("axios error :", err.response?.data || err.message);
        toast.error("Something went wrong !",{
          autoClose: 1000,
        })
      });
  };
  return (
    <div className="bg-pink-50 h-screen overflow-hidden">
      <Navbar />
      <div className="pt-[100px] sm:flex justify-center items-center min-h-screen ">
        <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
          <form onSubmit={handleSubmitLogin}>
            {/* Email Field */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 text-sm font-medium mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={loginValue.email}
                onChange={handleChangeLogin}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
              />
            </div>

            {/* Password Field */}
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-gray-700 text-sm font-medium mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={loginValue.password}
                onChange={handleChangeLogin}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gray-900 text-white py-2 px-4 rounded-md hover:bg-gray-950 transition-colors"
            >
              Login
            </button>
          </form>

          {/* Signup Link */}
          <p className="text-sm text-gray-600 text-center mt-4">
            Don’t have an account?{" "}
            <a href="/signup" className="text-blue-500 hover:underline">
              Signup
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;