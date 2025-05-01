import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { AuthProvider, useAuth } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import Login from "./pages/Login";
import VerifyOTP from "./pages/VerifyOTP";
import Dashboard from "./pages/Dashboard";
import Layout from "./components/Layout/Layout";

const AppContent = () => {
  const { isAuth, isVerified, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50 dark:bg-gray-900">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 dark:border-gray-700"></div>
          <div className="absolute top-0 left-0 animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
        </div>
      </div>
    );
  }

  return (
    <Layout>
      <Routes>
        <Route
          path="/login"
          element={
            isAuth ? (
              isVerified ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Navigate to="/verify-otp" replace />
              )
            ) : (
              <Login />
            )
          }
        />

        <Route
          path="/verify-otp"
          element={
            !isAuth ? (
              <Navigate to="/login" replace />
            ) : isVerified ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <VerifyOTP />
            )
          }
        />

        <Route
          path="/dashboard"
          element={
            !isAuth ? (
              <Navigate to="/login" replace />
            ) : !isVerified ? (
              <Navigate to="/verify-otp" replace />
            ) : (
              <Dashboard />
            )
          }
        />

        <Route
          path="*"
          element={
            !isAuth ? (
              <Navigate to="/login" replace />
            ) : !isVerified ? (
              <Navigate to="/verify-otp" replace />
            ) : (
              <Navigate to="/dashboard" replace />
            )
          }
        />
      </Routes>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "var(--toast-bg, #fff)",
            color: "var(--toast-color, #333)",
            borderRadius: "0.5rem",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
          },
          success: {
            iconTheme: {
              primary: "#10B981",
              secondary: "white",
            },
          },
          error: {
            iconTheme: {
              primary: "#EF4444",
              secondary: "white",
            },
          },
        }}
      />
    </Layout>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <AppContent />
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
