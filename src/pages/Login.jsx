// src/pages/Login.jsx
import { useState, useEffect } from "react";
import { Input, Button, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../store/slices/authSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, token } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData));
  };

  useEffect(() => {
    if (error) toast.error(error);
    if (token) {
      toast.success("Login successful!");
      navigate("/");
    }
  }, [error, token, navigate]);

  return (
  <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
    >
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

      {error && (
        <div className="mb-4 text-red-500 text-sm text-center">
          {error === "Request failed with status code 401"
            ? "Invalid email or password"
            : error}
        </div>
      )}

      <div className="mb-4">
        <Input
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>

      <div className="mb-4">
        <Input.Password
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
      </div>

      <Button
        type="primary"
        htmlType="submit"
        block
        disabled={loading}
        icon={loading && <Spin size="small" />}
      >
        {loading ? "Logging in..." : "Login"}
      </Button>
    </form>
  </div>
)
}