import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function TaskLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="App">
      <div className="container container-wide">
        <header className="app-header">
          <h1>QuickTask</h1>
          <p className="app-subtitle">Welcome, {user?.name || "there"}</p>
        </header>

        <nav className="main-nav" aria-label="Task sections">
          <NavLink
            to="/pending"
            className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
          >
            Pending
          </NavLink>
          <NavLink
            to="/completed"
            className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
          >
            Completed
          </NavLink>
          <button type="button" className="btn-logout" onClick={handleLogout}>
            Log out
          </button>
        </nav>

        <Outlet />
      </div>
    </div>
  );
}

export default TaskLayout;
