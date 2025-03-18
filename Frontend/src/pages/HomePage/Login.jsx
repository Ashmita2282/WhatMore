import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({
    role: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData,
        {
          withCredentials: true, // Move inside the config object
        }
      );
      

      localStorage.setItem("token", response.data.token);
      setMessage(response.data.message);
      setIsSuccess(true);
      console.log("Login successful", response.data);

      // Check role and redirect accordingly
      const userRole = response.data.user.role;
      console.log("User object:", response.data.user);
console.log(`Detected Role: ${userRole}`);
      console.log(`login.jsx role: ${userRole}`);
      if (userRole === "superadmin") {
        navigate("/superadmin");
      }
      else if (userRole === "client") {  
        console.log("Navigating to /clientPage");
        navigate("/clientPage");  
      }
    } catch (error) {
      console.error("Login error", error);
      setMessage(
        error.response?.data.message || "Login failed. Please try again."
      );
      setIsSuccess(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        {message && (
          <div
            className={`mb-4 p-2 text-center rounded ${
              isSuccess ? "bg-green-500" : "bg-red-500"
            } text-white`}
          >
            {message}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
            >
              <option value="superadmin">Super Admin</option>
              <option value="admin">Admin</option>
              <option value="customer">Customer</option>
              <option value="client">Client</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Login
          </button>
        </form>
        <p className="text-center mt-4 text-gray-600">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
