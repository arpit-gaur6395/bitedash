import { useState } from "react";
import { useAuth } from "../context/AuthContext.js";
import { theme } from "../styles/theme.js";

function LoginModal({ isOpen, onClose }) {
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

  const modalOverlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: theme.colors.overlay,
    zIndex: 1000,
    display: isOpen ? 'flex' : 'none',
    alignItems: 'center',
    justifyContent: 'center'
  };

  const modalStyle = {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.xl,
    width: '90%',
    maxWidth: '450px',
    maxHeight: '90vh',
    overflow: 'auto',
    boxShadow: theme.shadows['2xl'],
    position: 'relative'
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.lg
  };

  const titleStyle = {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text,
    margin: 0
  };

  const closeButtonStyle = {
    background: 'none',
    border: 'none',
    fontSize: theme.typography.fontSize.xl,
    cursor: 'pointer',
    color: theme.colors.textLight,
    padding: theme.spacing.xs,
    borderRadius: theme.borderRadius.md,
    transition: theme.transitions.fast
  };

  const tabContainerStyle = {
    display: 'flex',
    marginBottom: theme.spacing.lg,
    borderBottom: `1px solid ${theme.colors.border}`
  };

  const tabStyle = {
    flex: 1,
    padding: theme.spacing.md,
    backgroundColor: 'transparent',
    border: 'none',
    borderBottom: '2px solid transparent',
    cursor: 'pointer',
    fontSize: theme.typography.fontSize.base,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.textLight,
    transition: theme.transitions.fast
  };

  const activeTabStyle = {
    ...tabStyle,
    color: theme.colors.primary,
    borderBottom: `2px solid ${theme.colors.primary}`
  };

  const formGroupStyle = {
    marginBottom: theme.spacing.lg
  };

  const labelStyle = {
    display: 'block',
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs
  };

  const inputStyle = {
    width: '100%',
    padding: theme.spacing.md,
    border: `1px solid ${theme.colors.border}`,
    borderRadius: theme.borderRadius.md,
    fontSize: theme.typography.fontSize.base,
    outline: 'none',
    transition: theme.transitions.fast,
    backgroundColor: theme.colors.background
  };

  const passwordInputStyle = {
    ...inputStyle,
    fontFamily: 'monospace'
  };

  const errorStyle = {
    color: theme.colors.error,
    fontSize: theme.typography.fontSize.xs,
    margin: `${theme.spacing.xs} 0 0 0`
  };

  const submitButtonStyle = {
    width: '100%',
    padding: theme.spacing.md,
    backgroundColor: theme.colors.primary,
    color: 'white',
    border: 'none',
    borderRadius: theme.borderRadius.md,
    fontSize: theme.typography.fontSize.base,
    fontWeight: theme.typography.fontWeight.medium,
    cursor: 'pointer',
    transition: theme.transitions.fast,
    boxShadow: theme.shadows.sm
  };

  const guestButtonStyle = {
    width: '100%',
    padding: theme.spacing.sm + " " + theme.spacing.md,
    backgroundColor: 'transparent',
    color: theme.colors.primary,
    border: `1px solid ${theme.colors.primary}`,
    borderRadius: theme.borderRadius.md,
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.medium,
    cursor: 'pointer',
    transition: theme.transitions.fast,
    marginTop: theme.spacing.sm
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
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
      if (!formData.name.trim()) {
        newErrors.name = "Name is required";
      } else if (formData.name.trim().length < 2) {
        newErrors.name = "Name must be at least 2 characters";
      }

      if (!formData.confirmPassword) {
        newErrors.confirmPassword = "Please confirm your password";
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsLoading(true);

      try {
        if (isRegisterMode) {
          await signup(formData.email, formData.password, formData.name);
        } else {
          await login(formData.email, formData.password);
        }
        setFormData({ name: "", email: "", phone: "", password: "", confirmPassword: "" });
        setErrors({});
        setIsLoading(false);
        setIsRegisterMode(false);
        onClose();
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
        }
        setErrors({ general: errorMessage });
        setIsLoading(false);
      }
    }
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const switchMode = () => {
    setIsRegisterMode(!isRegisterMode);
    setErrors({});
    setFormData({ name: "", email: "", phone: "", password: "", confirmPassword: "" });
  };

  if (!isOpen) return null;

  return (
    <div style={modalOverlayStyle} onClick={onClose}>
      <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
        <div style={headerStyle}>
          <h2 style={titleStyle}>
            {isRegisterMode ? "Create Account" : "Login to BiteDash"}
          </h2>
          <button
            style={closeButtonStyle}
            onClick={onClose}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = theme.colors.backgroundLight;
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'transparent';
            }}
          >
            ×
          </button>
        </div>

        <div style={tabContainerStyle}>
          <button
            style={!isRegisterMode ? activeTabStyle : tabStyle}
            onClick={() => !isRegisterMode || switchMode()}
          >
            Login
          </button>
          <button
            style={isRegisterMode ? activeTabStyle : tabStyle}
            onClick={() => isRegisterMode || switchMode()}
          >
            Register
          </button>
        </div>

        {errors.general && (
          <div style={{
            ...errorStyle,
            marginBottom: theme.spacing.md,
            padding: theme.spacing.sm,
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            borderRadius: theme.borderRadius.md
          }}>
            {errors.general}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {isRegisterMode && (
            <div style={formGroupStyle}>
              <label style={labelStyle} htmlFor="name">Full Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                style={inputStyle}
                placeholder="Enter your full name"
                onFocus={(e) => {
                  e.target.style.borderColor = theme.colors.primary;
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = theme.colors.border;
                }}
              />
              {errors.name && <div style={errorStyle}>{errors.name}</div>}
            </div>
          )}

          <div style={formGroupStyle}>
            <label style={labelStyle} htmlFor="email">Email Address *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={inputStyle}
              placeholder="your.email@example.com"
              onFocus={(e) => {
                e.target.style.borderColor = theme.colors.primary;
              }}
              onBlur={(e) => {
                e.target.style.borderColor = theme.colors.border;
              }}
            />
            {errors.email && <div style={errorStyle}>{errors.email}</div>}
          </div>

          <div style={formGroupStyle}>
            <label style={labelStyle} htmlFor="password">Password *</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              style={passwordInputStyle}
              placeholder={isRegisterMode ? "Create a strong password" : "Enter your password"}
              onFocus={(e) => {
                e.target.style.borderColor = theme.colors.primary;
              }}
              onBlur={(e) => {
                e.target.style.borderColor = theme.colors.border;
              }}
            />
            {errors.password && <div style={errorStyle}>{errors.password}</div>}
          </div>

          {isRegisterMode && (
            <div style={formGroupStyle}>
              <label style={labelStyle} htmlFor="confirmPassword">Confirm Password *</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                style={passwordInputStyle}
                placeholder="Confirm your password"
                onFocus={(e) => {
                  e.target.style.borderColor = theme.colors.primary;
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = theme.colors.border;
                }}
              />
              {errors.confirmPassword && <div style={errorStyle}>{errors.confirmPassword}</div>}
            </div>
          )}

          <button
            type="submit"
            style={submitButtonStyle}
            disabled={isLoading}
            onMouseEnter={(e) => {
              if (!isLoading) {
                e.target.style.backgroundColor = theme.colors.primaryDark;
                e.target.style.transform = "translateY(-1px)";
                e.target.style.boxShadow = theme.shadows.md;
              }
            }}
            onMouseLeave={(e) => {
              if (!isLoading) {
                e.target.style.backgroundColor = theme.colors.primary;
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = theme.shadows.sm;
              }
            }}
          >
            {isLoading ? "Processing..." : (isRegisterMode ? "Create Account" : "Login")}
          </button>
        </form>

        {isRegisterMode && (
          <div style={{
            marginTop: theme.spacing.md,
            padding: theme.spacing.md,
            backgroundColor: 'rgba(252, 128, 25, 0.05)',
            borderRadius: theme.borderRadius.md,
            fontSize: theme.typography.fontSize.xs,
            color: theme.colors.textLight,
            lineHeight: '1.4'
          }}>
            <strong>Password Requirements:</strong><br />
            • At least 6 characters
          </div>
        )}
      </div>
    </div>
  );
}

export default LoginModal;
