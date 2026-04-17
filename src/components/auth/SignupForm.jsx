import { useState } from "react";
import { registerUser, getGoogleLoginUrl } from "../../services/authService";

/* ================= INPUT COMPONENT ================= */
function Input({ label, name, type = "text", value, onChange, placeholder }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <label
        style={{
          display: "block",
          marginBottom: 6,
          fontSize: 14,
          fontWeight: 600,
          color: "#374151",
        }}
      >
        {label}
      </label>

      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={{
          width: "100%",
          padding: "12px 14px",
          borderRadius: "12px",
          border: "1px solid #d1d5db",
          outline: "none",
          fontSize: 14,
          background: "#f9fafb",
          color: "#111827",
          boxSizing: "border-box",
        }}
      />
    </div>
  );
}

/* ================= SIGNUP FORM ================= */
export default function SignupForm({ onSwitch }) {
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  /* ===== HANDLE INPUT CHANGE ===== */
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  /* ===== HANDLE SUBMIT ===== */
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await registerUser({
  email: formData.email.trim(),
  password: formData.password,
  username: formData.username.trim(),
  fullName: formData.fullName.trim(),
});

      setSuccess("Account created successfully! Please sign in.");

      setFormData({
        fullName: "",
        username: "",
        email: "",
        password: "",
      });
    }catch (err) {
  console.log("REGISTER ERROR:", err);
  console.log("REGISTER ERROR RESPONSE:", err.response);
  console.log("REGISTER ERROR DATA:", err.response?.data);

  const errorData = err.response?.data;

  if (typeof errorData === "string") {
    setError(errorData);
  } else if (errorData?.message) {
    setError(errorData.message);
  } else if (errorData?.error) {
    setError(errorData.error);
  } else {
    setError("Registration failed");
  }
}
    finally {
      setLoading(false);
    }
  };

  /* ===== GOOGLE LOGIN ===== */
  const handleGoogleLogin = () => {
    window.location.href = getGoogleLoginUrl();
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* ===== HEADING ===== */}
      <p
        style={{
          textAlign: "center",
          marginBottom: 22,
          color: "#6b7280",
          fontSize: 14,
        }}
      >
        Create your account and start chatting on ConnectHub
      </p>

      {/* ===== GOOGLE BUTTON ===== */}
      <button
        type="button"
        onClick={handleGoogleLogin}
        style={{
          width: "100%",
          padding: "12px",
          borderRadius: "12px",
          border: "1px solid #d1d5db",
          background: "#ffffff",
          cursor: "pointer",
          marginBottom: 18,
          fontWeight: 600,
          fontSize: 14,
        }}
      >
        Continue with Google
      </button>

      {/* ===== INPUTS ===== */}
      <Input
        label="Full Name"
        name="fullName"
        value={formData.fullName}
        onChange={handleChange}
        placeholder="Enter your full name"
      />

      <Input
        label="Username"
        name="username"
        value={formData.username}
        onChange={handleChange}
        placeholder="Choose a username"
      />

      <Input
        label="Email"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="you@example.com"
      />

      <Input
        label="Password"
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Create a password"
      />

      {/* ===== ERROR MESSAGE ===== */}
      {error && (
        <p
          style={{
            color: "#dc2626",
            textAlign: "center",
            marginTop: 8,
            fontSize: 14,
          }}
        >
          {error}
        </p>
      )}

      {/* ===== SUCCESS MESSAGE ===== */}
      {success && (
        <p
          style={{
            color: "#059669",
            textAlign: "center",
            marginTop: 8,
            fontSize: 14,
          }}
        >
          {success}
        </p>
      )}

      {/* ===== SUBMIT BUTTON ===== */}
      <button
        type="submit"
        disabled={loading}
        style={{
          width: "100%",
          padding: "12px",
          background: "linear-gradient(135deg, #7c3aed, #5b5ea6)",
          color: "#fff",
          border: "none",
          borderRadius: "12px",
          marginTop: 14,
          cursor: "pointer",
          fontWeight: 600,
          fontSize: 15,
        }}
      >
        {loading ? "Creating account..." : "Create Account"}
      </button>

      {/* ===== SWITCH TO LOGIN ===== */}
      <p
        style={{
          textAlign: "center",
          marginTop: 18,
          fontSize: 14,
          color: "#6b7280",
        }}
      >
        Already have an account?{" "}
        <span
          onClick={onSwitch}
          style={{
            color: "#5b5ea6",
            cursor: "pointer",
            fontWeight: 700,
          }}
        >
          Sign in
        </span>
      </p>
    </form>
  );
}