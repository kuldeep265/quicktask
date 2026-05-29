import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";
import AuthBrandPanel from "../components/AuthBrandPanel";
import { useAuth } from "../context/AuthContext";
import "../Auth.css";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await api.post("/auth/signup", { name, email, password });
      login(response.data.token, response.data.user);
      navigate("/pending", { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Sign up failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-shell">
      <AuthBrandPanel
        title="Start fresh today"
        subtitle="Create your account and split work into clear pending and done views."
      />

      <div className="auth-panel">
        <div className="auth-panel-inner">
          <header className="auth-panel-header">
            <p className="auth-eyebrow">Get started</p>
            <h1>Create your account</h1>
            <p>It only takes a moment to set up your personal task space.</p>
          </header>

          <form className="auth-form" onSubmit={handleSubmit}>
            {error && (
              <p className="auth-error" role="alert">
                {error}
              </p>
            )}

            <label>
              Full name
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                required
                autoComplete="name"
              />
            </label>

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
                placeholder="At least 6 characters"
                required
                minLength={6}
                autoComplete="new-password"
              />
            </label>

            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? "Creating account..." : "Create account"}
            </button>
          </form>

          <p className="auth-switch">
            Already registered? <Link to="/login">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
