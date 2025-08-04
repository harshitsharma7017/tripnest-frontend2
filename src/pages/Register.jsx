import { useState, useEffect } from "react";
import { Input, Button, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, resetAuthState } from "../store/slices/authSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, success } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(formData));
  };

  useEffect(() => {
    if (error) toast.error(error);
    if (success) {
      toast.success("Registration successful! Please login.");
      dispatch(resetAuthState());
      navigate("/login");
    }
  }, [error, success, navigate, dispatch]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

        <div className="mb-4">
          <Input
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

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
          {loading ? "Registering..." : "Register"}
        </Button>

        <div className="mt-4 text-center">
          <span className="text-gray-600">Already have an account? </span>
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="text-blue-600 hover:underline font-medium"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}