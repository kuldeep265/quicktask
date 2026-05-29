import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function TaskLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const initials = (user?.name || "U")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="app-shell">
      <aside className="sidebar" aria-label="Main navigation">
        <div className="sidebar-brand">
          <span className="logo-mark" aria-hidden="true">✓</span>
          <span className="logo-text">QuickTask</span>
        </div>

        <nav className="sidebar-nav">
          <NavLink
            to="/pending"
            className={({ isActive }) =>
              `sidebar-link ${isActive ? "active" : ""}`
            }
          >
            <span className="nav-icon" aria-hidden="true">◷</span>
            Pending
          </NavLink>
          <NavLink
            to="/completed"
            className={({ isActive }) =>
              `sidebar-link ${isActive ? "active" : ""}`
            }
          >
            <span className="nav-icon" aria-hidden="true">✓</span>
            Completed
          </NavLink>
        </nav>

        <div className="sidebar-footer">
          <div className="user-chip">
            <span className="user-avatar" aria-hidden="true">
              {initials}
            </span>
            <div className="user-meta">
              <span className="user-name">{user?.name}</span>
              <span className="user-email">{user?.email}</span>
            </div>
          </div>
          <button type="button" className="btn-logout" onClick={handleLogout}>
            Log out
          </button>
        </div>
      </aside>

      <main className="main-stage">
        <Outlet />
      </main>

      <nav className="mobile-nav" aria-label="Mobile navigation">
        <NavLink
          to="/pending"
          className={({ isActive }) =>
            `mobile-nav-link ${isActive ? "active" : ""}`
          }
        >
          Pending
        </NavLink>
        <NavLink
          to="/completed"
          className={({ isActive }) =>
            `mobile-nav-link ${isActive ? "active" : ""}`
          }
        >
          Completed
        </NavLink>
      </nav>
    </div>
  );
}

export default TaskLayout;
