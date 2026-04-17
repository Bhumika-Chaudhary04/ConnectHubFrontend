import { useState } from "react";
import { loginUser, getGoogleLoginUrl } from "../../services/authService";

function Input({ label, type = "text", value, onChange, placeholder }) {
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

export default function LoginForm({ onSwitch, onSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      setError("Please enter email and password");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const data = await loginUser({
        email: email.trim(),
        password: password.trim(),
      });

      console.log("Login response:", data);

      if (!data?.token) {
        throw new Error("Token not received from backend");
      }

      localStorage.setItem("connecthub_token", data.token);
      localStorage.setItem("userId", data.userId || "");
      localStorage.setItem("username", data.username || "");
      localStorage.setItem("email", data.email || "");
      localStorage.setItem("fullName", data.fullName || "");

      onSuccess();
    } catch (err) {
      console.error("Login failed:", err);

      setError(
        err.response?.data?.message ||
          err.response?.data?.error ||
          err.message ||
          "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = getGoogleLoginUrl();
  };

  return (
    <form onSubmit={handleSubmit}>
      <p
        style={{
          textAlign: "center",
          marginBottom: 22,
          color: "#6b7280",
          fontSize: 14,
        }}
      >
        Welcome back. Sign in to continue to ConnectHub.
      </p>

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

      <Input
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
      />

      <Input
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter your password"
      />

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
          cursor: loading ? "not-allowed" : "pointer",
          opacity: loading ? 0.8 : 1,
          fontWeight: 600,
          fontSize: 15,
        }}
      >
        {loading ? "Signing in..." : "Sign In"}
      </button>

      <p
        style={{
          textAlign: "center",
          marginTop: 18,
          fontSize: 14,
          color: "#6b7280",
        }}
      >
        Don’t have an account?{" "}
        <span
          onClick={onSwitch}
          style={{
            color: "#5b5ea6",
            cursor: "pointer",
            fontWeight: 700,
          }}
        >
          Sign up
        </span>
      </p>
    </form>
  );
}