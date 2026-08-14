import { useState, useEffect } from "react";
import {
  useNavigate,
  Link,
} from "react-router-dom";
import api from "../services/api";

function Login() {
  const navigate = useNavigate();
  useEffect(() => {
  const token = localStorage.getItem("token");

  if (token) {
    navigate("/dashboard");
  }
}, []);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
  alert("Please fill all fields");
  return;
}
    try {
      const response = await api.post(
        "/api/auth/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem(
        "token",
        response.data.token
      );

      alert("Login Successful");

      navigate("/dashboard");
    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Login Failed"
      );
    }
  };

  return (
  <div className="container">
    <div className="card auth-card">
      <h1>🚚 Logistics Platform</h1>

      <h2>Login</h2>

      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <br /><br />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <br /><br />

      <button onClick={handleLogin}>
        Login
      </button>

      <br /><br />

      <p>
        Don't have an account?
        {" "}
        <Link to="/register">
  Register
</Link>
      </p>
    </div>
  </div>
);
}

export default Login;