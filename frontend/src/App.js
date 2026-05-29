import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import ProtectedRoute from "./components/ProtectedRoute";
import TaskLayout from "./components/TaskLayout";
import { AuthProvider, useAuth } from "./context/AuthContext";
import CompletedTasks from "./pages/CompletedTasks";
import Login from "./pages/Login";
import PendingTasks from "./pages/PendingTasks";
import Signup from "./pages/Signup";

function PublicOnlyRoute({ children }) {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) {
    return <Navigate to="/pending" replace />;
  }
  return children;
}

function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <PublicOnlyRoute>
            <Login />
          </PublicOnlyRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <PublicOnlyRoute>
            <Signup />
          </PublicOnlyRoute>
        }
      />
      <Route
        element={
          <ProtectedRoute>
            <TaskLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/pending" element={<PendingTasks />} />
        <Route path="/completed" element={<CompletedTasks />} />
      </Route>
      <Route path="/" element={<Navigate to="/pending" replace />} />
      <Route path="*" element={<Navigate to="/pending" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
