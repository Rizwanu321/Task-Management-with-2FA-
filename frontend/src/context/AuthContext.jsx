import React, { createContext, useContext, useState, useEffect } from "react";
import {
  getToken,
  getUser,
  setToken,
  setUser,
  logout as logoutUtil,
} from "../utils/auth";
import { verifyAuth } from "../utils/api";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkVerificationStatus = () => {
    try {
      return localStorage.getItem("isVerified") === "true";
    } catch (error) {
      console.error("Verification check failed:", error);
      return false;
    }
  };

  useEffect(() => {
    const initAuth = async () => {
      const token = getToken();
      if (token) {
        try {
          const { authenticated, user } = await verifyAuth();
          if (authenticated) {
            setCurrentUser(user);
            setIsAuth(true);

            const verified = checkVerificationStatus();
            setIsVerified(verified);
          } else {
            logoutUtil();
            localStorage.removeItem("isVerified");
          }
        } catch (error) {
          console.error("Auth verification failed:", error);
          logoutUtil();
          localStorage.removeItem("isVerified");
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = (token, user) => {
    setToken(token);
    setUser(user);
    setCurrentUser(user);
    setIsAuth(true);
    setIsVerified(false);
    localStorage.removeItem("isVerified");
  };

  const logout = () => {
    logoutUtil();
    setCurrentUser(null);
    setIsAuth(false);
    setIsVerified(false);
    localStorage.removeItem("isVerified");
  };

  const updateToken = (token) => {
    setToken(token);
    setIsVerified(true);
    localStorage.setItem("isVerified", "true");
  };

  const value = {
    currentUser,
    isAuth,
    isVerified,
    loading,
    login,
    logout,
    updateToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
