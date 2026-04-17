import { useState } from "react";
import LoginForm from "../components/auth/LoginForm";
import SignupForm from "../components/auth/SignupForm";

export default function ConnectHubAuth({ onLogin }) {
  const [mode, setMode] = useState("login");

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        background:
          "linear-gradient(135deg, #f5f3ff 0%, #eff6ff 50%, #fdf2f8 100%)",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "440px",
          background: "rgba(255,255,255,0.95)",
          border: "1px solid #e5e7eb",
          borderRadius: "24px",
          padding: "36px 28px",
          boxShadow: "0 20px 50px rgba(91, 94, 166, 0.12)",
          backdropFilter: "blur(8px)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 26 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: "20px",
              margin: "0 auto 14px",
              background: "linear-gradient(135deg, #7c3aed, #5b5ea6)",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "28px",
              fontWeight: 800,
              boxShadow: "0 12px 24px rgba(91, 94, 166, 0.25)",
            }}
          >
            C
          </div>

          <h1
            style={{
              margin: 0,
              fontSize: "30px",
              fontWeight: 800,
              color: "#111827",
              letterSpacing: "-0.8px",
            }}
          >
            ConnectHub
          </h1>

          <p
            style={{
              marginTop: 8,
              marginBottom: 0,
              color: "#6b7280",
              fontSize: 15,
            }}
          >
            Simple and secure chat experience
          </p>
        </div>

        <div
          style={{
            display: "flex",
            background: "#f3f4f6",
            borderRadius: "14px",
            padding: "4px",
            marginBottom: 24,
          }}
        >
          <button
            type="button"
            onClick={() => setMode("login")}
            style={{
              flex: 1,
              padding: "10px 12px",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
              fontWeight: 700,
              background: mode === "login" ? "#ffffff" : "transparent",
              color: mode === "login" ? "#111827" : "#6b7280",
              boxShadow:
                mode === "login" ? "0 4px 10px rgba(0,0,0,0.06)" : "none",
            }}
          >
            Sign In
          </button>

          <button
            type="button"
            onClick={() => setMode("signup")}
            style={{
              flex: 1,
              padding: "10px 12px",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
              fontWeight: 700,
              background: mode === "signup" ? "#ffffff" : "transparent",
              color: mode === "signup" ? "#111827" : "#6b7280",
              boxShadow:
                mode === "signup" ? "0 4px 10px rgba(0,0,0,0.06)" : "none",
            }}
          >
            Sign Up
          </button>
        </div>

        {mode === "login" ? (
          <LoginForm
            onSwitch={() => setMode("signup")}
            onSuccess={onLogin}
          />
        ) : (
          <SignupForm
            onSwitch={() => setMode("login")}
          />
        )}
      </div>
    </div>
  );
}