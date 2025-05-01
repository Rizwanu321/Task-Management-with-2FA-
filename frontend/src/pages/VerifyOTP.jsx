import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { generateOTP, verifyOTP } from "../utils/api";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { ArrowLeft, Loader } from "lucide-react";

const VerifyOTP = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [expiresAt, setExpiresAt] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [emailSent, setEmailSent] = useState(false);
  const inputRefs = useRef([]);
  const initialized = useRef(false);

  const { isAuth, updateToken, currentUser, logout } = useAuth();
  const { darkMode } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
      return;
    }

    if (!initialized.current) {
      initialized.current = true;
      handleGenerateOTP();
    }
  }, [isAuth, navigate]);

  useEffect(() => {
    let timer;
    if (expiresAt) {
      timer = setInterval(() => {
        const now = new Date().getTime();
        const expTime = new Date(expiresAt).getTime();
        const diff = Math.max(0, Math.floor((expTime - now) / 1000));

        setTimeLeft(diff);

        if (diff <= 0) {
          clearInterval(timer);
          toast.error("OTP expired. Please generate a new one.");
        }
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [expiresAt]);

  const handleGenerateOTP = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const response = await generateOTP();
      setExpiresAt(response.expiresAt);
      setEmailSent(true);
      toast.success("OTP sent to your email!");
    } catch (error) {
      toast.error(error.message || "Failed to generate OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();

    const otpValue = otp.join("");

    if (otpValue.length !== 6) {
      toast.error("Please enter the complete 6-digit OTP");
      return;
    }

    setVerifying(true);

    try {
      const response = await verifyOTP(otpValue);
      updateToken(response.token);
      toast.success("OTP verified successfully!");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.message || "OTP verification failed");
    } finally {
      setVerifying(false);
    }
  };

  const handleOtpChange = (index, value) => {
    if (value && !/^\d+$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" + secs : secs}`;
  };

  const handleBackToLogin = () => {
    logout();
    navigate("/login");
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").trim();

    if (/^\d+$/.test(pastedData)) {
      const digits = pastedData.split("").slice(0, 6);
      const newOtp = [...otp];

      digits.forEach((digit, index) => {
        if (index < 6) {
          newOtp[index] = digit;
        }
      });

      setOtp(newOtp);
      const nextEmptyIndex = newOtp.findIndex((val) => val === "");
      if (nextEmptyIndex !== -1 && nextEmptyIndex < 6) {
        inputRefs.current[nextEmptyIndex].focus();
      } else if (digits.length < 6) {
        inputRefs.current[digits.length].focus();
      } else {
        inputRefs.current[5].focus();
      }
    }
  };

  return (
    <div
      className={`min-h-[80vh] md:min-h-0 flex flex-col ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-800"
      }`}
    >
      <div className="flex-1 flex justify-center items-center p-4">
        <div
          className={`w-full max-w-md ${
            darkMode ? "bg-gray-800" : "bg-white"
          } rounded-2xl shadow-xl p-4 sm:p-6 md:p-8 relative`}
        >
          <button
            onClick={handleBackToLogin}
            className={`absolute top-4 left-4 sm:top-5 sm:left-5 p-2 rounded-full transition-colors ${
              darkMode
                ? "bg-gray-700 hover:bg-gray-600 text-gray-300"
                : "bg-gray-100 hover:bg-gray-200 text-gray-600"
            } flex items-center justify-center`}
            aria-label="Back to login"
          >
            <ArrowLeft size={18} className="sm:w-5 sm:h-5" />
          </button>

          <div className="mt-6 sm:mt-4">
            <h1
              className={`text-xl sm:text-2xl md:text-3xl font-bold text-center mb-4 sm:mb-6 ${
                darkMode ? "text-white" : "text-gray-800"
              }`}
            >
              Verify OTP
            </h1>
          </div>

          {emailSent && (
            <div
              className={`mb-4 sm:mb-6 p-3 sm:p-4 ${
                darkMode
                  ? "bg-blue-900/30 border-blue-800"
                  : "bg-blue-50 border-blue-200"
              } rounded border text-center`}
            >
              <p
                className={`font-medium mb-1 sm:mb-2 text-sm sm:text-base ${
                  darkMode ? "text-blue-300" : "text-blue-800"
                }`}
              >
                OTP has been sent to your email
              </p>
              <p
                className={`text-sm sm:text-base ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                We've sent a 6-digit code to{" "}
                <span className="font-semibold">{currentUser?.email}</span>
              </p>
              {expiresAt && (
                <p
                  className={`mt-1 sm:mt-2 text-xs sm:text-sm ${
                    darkMode ? "text-blue-300" : "text-blue-700"
                  }`}
                >
                  Expires in:{" "}
                  <span className="font-medium">{formatTime(timeLeft)}</span>
                </p>
              )}
            </div>
          )}

          <form onSubmit={handleVerify} className="space-y-4 sm:space-y-6">
            <div>
              <label
                className={`text-xs sm:text-sm font-medium block mb-2 sm:mb-3 ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Enter the 6-digit OTP
              </label>
              <div
                className="flex justify-between space-x-1 sm:space-x-2"
                onPaste={handlePaste}
              >
                {[0, 1, 2, 3, 4, 5].map((index) => (
                  <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength="1"
                    value={otp[index]}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    autoComplete="one-time-code"
                    className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 text-center text-lg sm:text-xl md:text-2xl font-bold rounded-lg border ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 text-white focus:border-blue-500"
                        : "bg-gray-50 border-gray-300 text-gray-800 focus:border-indigo-500"
                    } focus:outline-none focus:ring-2 ${
                      darkMode ? "focus:ring-blue-500" : "focus:ring-indigo-500"
                    } transition-colors`}
                  />
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2">
              <button
                type="button"
                onClick={handleGenerateOTP}
                disabled={loading}
                className={`py-2.5 sm:py-3 rounded-lg font-medium transition ${
                  darkMode
                    ? "bg-gray-700 hover:bg-gray-600 text-white border border-gray-600"
                    : "bg-white hover:bg-gray-100 text-gray-800 border border-gray-300"
                } flex justify-center items-center sm:flex-1 text-sm sm:text-base`}
              >
                {loading ? (
                  <span className="flex items-center">
                    <Loader className="animate-spin h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                    Sending...
                  </span>
                ) : (
                  "Resend OTP"
                )}
              </button>

              <button
                type="submit"
                disabled={verifying}
                className={`py-2.5 sm:py-3 rounded-lg font-medium transition ${
                  darkMode
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "bg-indigo-600 hover:bg-indigo-700 text-white"
                } flex justify-center items-center sm:flex-1 text-sm sm:text-base`}
              >
                {verifying ? (
                  <span className="flex items-center">
                    <Loader className="animate-spin h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                    Verifying...
                  </span>
                ) : (
                  "Verify"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;
