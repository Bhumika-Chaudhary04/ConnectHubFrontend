import { useState } from "react";

export default function OAuthButton({ icon, label, onClick }) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 7,
        padding: "9px 8px",
        borderRadius: "var(--border-radius-md)",
        cursor: "pointer",
        border: "1px solid var(--color-border-secondary)",
        background: hovered ? "var(--color-background-secondary)" : "var(--color-background-primary)",
        fontSize: 13,
        color: "var(--color-text-primary)",
        fontWeight: 500,
      }}
    >
      <span style={{ fontSize: 16 }}>{icon}</span>
      {label}
    </button>
  );
}