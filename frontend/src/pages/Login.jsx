import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { login as loginApi } from "../utils/api";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { EyeIcon, EyeOffIcon, MailIcon, LockIcon } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login, isAuth } = useAuth();
  const { darkMode } = useTheme();
  const [verify, setVerify] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth && verify) {
      navigate("/verify-otp");
    } else if (isAuth) {
      navigate("/dashboard");
    }
  }, [isAuth, navigate, verify]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please enter both email and password");
      return;
    }

    setLoading(true);

    try {
      const response = await loginApi(email, password);
      login(response.token, response.user);
      navigate("/verify-otp");
      setVerify(true);
    } catch (error) {
      toast.error(error.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div
      className={`min-h-[80vh] md:min-h-0 flex flex-col ${
        darkMode ? "bg-gray-900 text-white" : ""
      }`}
    >
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 md:p-8">
        <div className="w-full max-w-md">
          <div
            className={`${
              darkMode ? "bg-gray-800" : "bg-white"
            } rounded-2xl shadow-xl p-5 sm:p-6 md:p-8 space-y-6 sm:space-y-8`}
          >
            <div className="text-center">
              <h1
                className={`text-2xl sm:text-3xl font-bold ${
                  darkMode ? "text-white" : "text-gray-800"
                }`}
              >
                Welcome back
              </h1>
              <p
                className={`mt-2 text-sm sm:text-base ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Log in to your account
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div className="space-y-1 sm:space-y-2">
                <label
                  htmlFor="email"
                  className={`text-sm font-medium block ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MailIcon
                      className={`h-4 w-4 sm:h-5 sm:w-5 ${
                        darkMode ? "text-gray-500" : "text-gray-400"
                      }`}
                    />
                  </div>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className={`block w-full pl-10 pr-3 py-2 sm:py-3 border rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 transition ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500"
                        : "bg-gray-50 border-gray-300 text-gray-800 focus:ring-indigo-500 focus:border-indigo-500"
                    }`}
                  />
                </div>
              </div>

              <div className="space-y-1 sm:space-y-2">
                <label
                  htmlFor="password"
                  className={`text-sm font-medium block ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <LockIcon
                      className={`h-4 w-4 sm:h-5 sm:w-5 ${
                        darkMode ? "text-gray-500" : "text-gray-400"
                      }`}
                    />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    className={`block w-full pl-10 pr-10 py-2 sm:py-3 border rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 transition ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500"
                        : "bg-gray-50 border-gray-300 text-gray-800 focus:ring-indigo-500 focus:border-indigo-500"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <EyeOffIcon
                        className={`h-4 w-4 sm:h-5 sm:w-5 ${
                          darkMode
                            ? "text-gray-400 hover:text-gray-300"
                            : "text-gray-400 hover:text-gray-600"
                        }`}
                      />
                    ) : (
                      <EyeIcon
                        className={`h-4 w-4 sm:h-5 sm:w-5 ${
                          darkMode
                            ? "text-gray-400 hover:text-gray-300"
                            : "text-gray-400 hover:text-gray-600"
                        }`}
                      />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-2 sm:py-3 px-4 font-medium rounded-lg transition focus:outline-none focus:ring-2 focus:ring-offset-2 text-sm sm:text-base ${
                  darkMode
                    ? "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500"
                    : "bg-indigo-600 hover:bg-indigo-700 text-white focus:ring-indigo-500"
                }`}
              >
                {loading ? (
                  <span className="flex justify-center items-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Logging in...
                  </span>
                ) : (
                  "Login"
                )}
              </button>
            </form>

            <div
              className={`mt-4 p-3 sm:p-4 rounded-lg border ${
                darkMode
                  ? "bg-gray-700 border-gray-600"
                  : "bg-gray-50 border-gray-100"
              }`}
            >
              <p
                className={`text-xs sm:text-sm text-center font-medium ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Demo credentials:
              </p>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-2 space-y-1 sm:space-y-0">
                <p
                  className={`text-xs ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  Email: rizwanurahman321@gmail.com
                </p>
                <p
                  className={`text-xs ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  Password: rizwanu123
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
