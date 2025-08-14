import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const { email, password } = credentials;

    if (email === "admin@gmail.com" && password === "admin123") {
      toast.success("Admin Login Successful");
      localStorage.setItem("user", JSON.stringify({ email, name: "Admin" }));
      localStorage.setItem("token", "admin-token");
      localStorage.setItem("isAdmin", true);
      localStorage.setItem("isUserLoggedIn", true);

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: {
          user: { email, name: "Admin" },
          isAdmin: true,
          token: "admin-token",
        },
      });
      navigate("/admin");
    } return;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4 text-center">Admin Login</h2>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={credentials.email}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={credentials.password}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4"
        />
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default AdminLogin;