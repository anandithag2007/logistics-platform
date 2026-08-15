import { useState, useEffect } from "react";
import {
  useNavigate,
  Link,
} from "react-router-dom";
import api from "../services/api";

function Register() {
  const navigate = useNavigate();
  useEffect(() => {
  const token = localStorage.getItem("token");

  if (token) {
    navigate("/dashboard");
  }
}, [navigate]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    if (!name || !email || !password) {
  alert("Please fill all fields");
  return;
}

if (password.length < 6) {
  alert(
    "Password must be at least 6 characters"
  );
  return;
}
    try {
      await api.post("/api/auth/register", {
        name,
        email,
        password,
      });

      alert("Registration Successful");

      navigate("/");
    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Registration Failed"
      );
    }
  };

  return (
  <div className="container">
    <div className="card auth-card">
      <h1>🚚 Logistics Platform</h1>

      <h2>Register</h2>

      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) =>
          setName(e.target.value)
        }
      />

      <br /><br />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
      />

      <br /><br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) =>
          setPassword(e.target.value)
        }
      />

      <br /><br />

      <button onClick={handleRegister}>
        Register
      </button>

      <br /><br />

      <p>
        Already have an account?
        {" "}
        <Link to="/">
  Login
</Link>
      </p>
    </div>
  </div>
);
}

export default Register;