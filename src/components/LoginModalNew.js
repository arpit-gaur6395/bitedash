import { useState } from "react";
import { useAuth } from "../context/AuthContext.js";

function LoginModalNew({ isOpen, onClose }) {
  const { login, signup } = useAuth();
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validateField = (name, value) => {
    const newErrors = { ...errors };

    switch (name) {
      case 'email':
        if (!value) {
          newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          newErrors.email = "Email is invalid";
        } else {
          delete newErrors.email;
        }
        break;
      case 'password':
        if (!value) {
          newErrors.password = "Password is required";
        } else if (value.length < 6) {
          newErrors.password = "Password must be at least 6 characters";
        } else {
          delete newErrors.password;
        }
        break;
      case 'name':
        if (!value) {
          newErrors.name = "Name is required";
        } else {
          delete newErrors.name;
        }
        break;
      case 'phone':
        if (!value) {
          newErrors.phone = "Phone is required";
        } else if (!/^\d{10}$/.test(value)) {
          newErrors.phone = "Phone must be 10 digits";
        } else {
          delete newErrors.phone;
        }
        break;
      case 'confirmPassword':
        if (value !== formData.password) {
          newErrors.confirmPassword = "Passwords do not match";
        } else {
          delete newErrors.confirmPassword;
        }
        break;
      default:
        break;
    }

    setErrors(newErrors);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (isRegisterMode) {
      if (!formData.name) {
        newErrors.name = "Name is required";
      }

      if (!formData.phone) {
        newErrors.phone = "Phone is required";
      } else if (!/^\d{10}$/.test(formData.phone)) {
        newErrors.phone = "Phone must be 10 digits";
      }

      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    try {
      if (isRegisterMode) {
        await signup(formData.email, formData.password, formData.name);
      } else {
        await login(formData.email, formData.password);
      }
      onClose();
      setFormData({ name: "", email: "", phone: "", password: "", confirmPassword: "" });
      setErrors({});
    } catch (error) {
      let errorMessage = "Authentication failed. Please try again.";

      if (error.code === 'auth/email-already-in-use') {
        errorMessage = "Email already in use. Please login instead.";
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = "Invalid email address.";
      } else if (error.code === 'auth/weak-password') {
        errorMessage = "Password is too weak. Use at least 6 characters.";
      } else if (error.code === 'auth/user-not-found') {
        errorMessage = "User not found. Please check your email.";
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = "Incorrect password.";
      } else if (error.code === 'auth/invalid-credential') {
        errorMessage = "Incorrect email or password.";
      } else if (error.code === 'auth/invalid-password') {
        errorMessage = "Invalid password.";
      } else if (error.message) {
        errorMessage = error.message;
      }
      setErrors({ general: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto relative animate-fade-in">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-6 rounded-t-2xl">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-white m-0">
                {isRegisterMode ? "Create Account" : "Welcome Back"}
              </h2>
              <p className="text-orange-100 text-sm mt-1">
                {isRegisterMode ? "Join BiteDash to order your favorite food" : "Login to continue ordering"}
              </p>
            </div>
            <button
              className="bg-white/20 hover:bg-white/30 text-white text-2xl font-light w-8 h-8 rounded-full flex items-center justify-center transition-colors border-none cursor-pointer"
              onClick={onClose}
            >
              ×
            </button>
          </div>
        </div>

        {/* Form */}
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            {isRegisterMode && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border-2 rounded-lg text-base outline-none transition-all ${errors.name ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200" : "border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                    }`}
                  placeholder="Enter your full name"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1.5 flex items-center gap-1"><span>⚠</span>{errors.name}</p>}
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border-2 rounded-lg text-base outline-none transition-all ${errors.email ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200" : "border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                  }`}
                placeholder="Enter your email address"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1.5 flex items-center gap-1"><span>⚠</span>{errors.email}</p>}
            </div>

            {isRegisterMode && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border-2 rounded-lg text-base outline-none transition-all ${errors.phone ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200" : "border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                    }`}
                  placeholder="Enter your phone number"
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1.5 flex items-center gap-1"><span>⚠</span>{errors.phone}</p>}
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border-2 rounded-lg text-base outline-none transition-all ${errors.password ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200" : "border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                  }`}
                placeholder="••••••••"
              />
              {errors.password && <p className="text-red-500 text-sm mt-1.5 flex items-center gap-1"><span>⚠</span>{errors.password}</p>}
            </div>

            {isRegisterMode && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border-2 rounded-lg text-base outline-none transition-all ${errors.confirmPassword ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200" : "border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                    }`}
                  placeholder="Enter your password"
                />
                {errors.confirmPassword && <p className="text-red-500 text-sm mt-1.5 flex items-center gap-1"><span>⚠</span>{errors.confirmPassword}</p>}
              </div>
            )}

            {errors.general && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                <div className="flex items-center gap-2">
                  <span>⚠</span>
                  {errors.general}
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3.5 rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                isRegisterMode ? "Create Account" : "Login"
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 pt-6 border-t border-gray-100 text-center">
            <p className="text-gray-600">
              {isRegisterMode ? "Already have an account?" : "New to BiteDash?"}
              <button
                type="button"
                className="text-orange-600 font-semibold hover:text-orange-700 ml-2 transition-colors"
                onClick={() => {
                  setIsRegisterMode(!isRegisterMode);
                  setErrors({});
                }}
              >
                {isRegisterMode ? "Login here" : "Create account"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginModalNew;
