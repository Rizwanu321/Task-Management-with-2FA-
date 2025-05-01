import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Button from "../UI/Button";
import ThemeToggle from "../UI/ThemeToggle";
import { Menu, X, ChevronDown, LayoutGrid, LogOut } from "lucide-react";

const Header = () => {
  const { isAuth, logout, currentUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);

  const isVerifyingOTP = location.pathname === "/verify-otp";
  const isLoginPage = location.pathname === "/login";

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    setUserMenuOpen(false);
    logout();
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-30 w-full bg-white dark:bg-gray-800 shadow-sm transition-colors backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link
              to={isAuth ? "/dashboard" : "/login"}
              className="flex items-center gap-2 focus:outline-none"
            >
              <div className="h-8 w-8 rounded-md bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg">
                T
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent hidden sm:block">
                TaskManager
              </h1>
            </Link>
          </div>

          {isAuth && !isVerifyingOTP && !isLoginPage ? (
            <div className="flex md:hidden">
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-md p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <span className="sr-only">Open menu</span>
                {!mobileMenuOpen ? (
                  <Menu className="h-6 w-6" />
                ) : (
                  <X className="h-6 w-6" />
                )}
              </button>
            </div>
          ) : (
            <div className="md:hidden">
              <ThemeToggle />
            </div>
          )}

          <div className="hidden md:flex md:items-center md:space-x-4">
            <ThemeToggle />

            {isAuth && !isVerifyingOTP && !isLoginPage && (
              <nav className="ml-4">
                <ul className="flex space-x-4">
                  <li>
                    <Link
                      to="/dashboard"
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        location.pathname === "/dashboard"
                          ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                          : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                      }`}
                    >
                      Dashboard
                    </Link>
                  </li>
                </ul>
              </nav>
            )}

            {isAuth && !isVerifyingOTP && !isLoginPage ? (
              <div className="relative ml-4" ref={userMenuRef}>
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center space-x-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white font-medium">
                    {currentUser?.name?.charAt(0) || "U"}
                  </div>
                  <span className="text-sm text-gray-700 dark:text-gray-200 font-medium">
                    {currentUser?.name}
                  </span>
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white dark:bg-gray-800 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10 border border-gray-200 dark:border-gray-700">
                    <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Signed in as
                      </p>
                      <p className="text-sm font-medium truncate text-gray-900 dark:text-gray-200">
                        {currentUser?.email}
                      </p>
                    </div>

                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              !isVerifyingOTP && (
                <Button
                  size="sm"
                  onClick={() => navigate("/login")}
                  className="ml-4"
                >
                  Sign In
                </Button>
              )
            )}
          </div>
        </div>
      </div>

      {isAuth && !isVerifyingOTP && !isLoginPage ? (
        <div
          className={`md:hidden ${
            mobileMenuOpen ? "block" : "hidden"
          } bg-gradient-to-b from-blue-50 via-indigo-50 to-white dark:from-gray-900 dark:via-indigo-950/40 dark:to-gray-900 shadow-lg rounded-b-lg`}
        >
          <div className="space-y-1 px-4 pb-4 pt-3 border-t border-gray-200 dark:border-gray-700">
            {isAuth && !isVerifyingOTP && (
              <Link
                to="/dashboard"
                className={`block rounded-lg px-4 py-2.5 text-base font-medium transition duration-150 ease-in-out ${
                  location.pathname === "/dashboard"
                    ? "bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 shadow-sm"
                    : "text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700/70"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <div className="flex items-center">
                  <span className="mr-2">
                    <LayoutGrid size={18} />
                  </span>
                  Dashboard
                </div>
              </Link>
            )}
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 pb-4 pt-4 bg-blue-50/90 dark:bg-indigo-950/50 backdrop-blur-sm">
            {isAuth ? (
              <>
                <div className="flex items-center px-4 py-2">
                  <div className="flex-shrink-0">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 flex items-center justify-center text-white font-medium text-lg shadow-md">
                      {currentUser?.name?.charAt(0) || "U"}
                    </div>
                  </div>
                  <div className="ml-4">
                    <div className="text-base font-semibold text-gray-800 dark:text-gray-100">
                      {currentUser?.name}
                    </div>
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      {currentUser?.email}
                    </div>
                  </div>
                  <div className="ml-auto">
                    <ThemeToggle />
                  </div>
                </div>

                <div className="mt-4 px-4">
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="block w-full text-left rounded-lg px-4 py-2.5 text-base font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition duration-150 ease-in-out flex items-center"
                  >
                    <span className="mr-2">
                      <LogOut size={18} />
                    </span>
                    Sign out
                  </button>
                </div>
              </>
            ) : (
              <div className="mt-3 px-4 py-2">
                <Button
                  onClick={() => {
                    navigate("/login");
                    setMobileMenuOpen(false);
                  }}
                  className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-800 text-white py-2.5 rounded-lg shadow-md transition duration-150 ease-in-out"
                >
                  Sign In
                </Button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <></>
      )}
    </header>
  );
};

export default Header;
