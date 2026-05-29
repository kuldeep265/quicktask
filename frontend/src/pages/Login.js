import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import api from "../api";
import AuthBrandPanel from "../components/AuthBrandPanel";
import { useAuth } from "../context/AuthContext";
import "../Auth.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from || "/pending";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await api.post("/auth/login", { email, password });
      login(response.data.token, response.data.user);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-shell">
      <AuthBrandPanel
        title="Welcome back"
        subtitle="Pick up where you left off and keep every task on track."
      />

      <div className="auth-panel">
        <div className="auth-panel-inner">
          <header className="auth-panel-header">
            <p className="auth-eyebrow">Sign in</p>
            <h1>Log in to your workspace</h1>
            <p>Enter your credentials to open your task boards.</p>
          </header>

          <form className="auth-form" onSubmit={handleSubmit}>
            {error && (
              <p className="auth-error" role="alert">
                {error}
              </p>
            )}

            <label>
              Email address
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                autoComplete="email"
              />
            </label>

            <label>
              Password
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Your password"
                required
                autoComplete="current-password"
              />
            </label>

            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <p className="auth-switch">
            New here? <Link to="/signup">Create an account</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
