import { useState } from "react";

const PRIMARY = "#5B5EA6";

export default function Input({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
  icon,
  rightElement,
}) {
  const [focused, setFocused] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const actualType = type === "password" ? (showPass ? "text" : "password") : type;

  return (
    <div style={{ marginBottom: 14 }}>
      {label && (
        <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "var(--color-text-secondary)", marginBottom: 5 }}>
          {label}
        </label>
      )}

      <div style={{ position: "relative" }}>
        {icon && (
          <span
            style={{
              position: "absolute",
              left: 11,
              top: "50%",
              transform: "translateY(-50%)",
              fontSize: 15,
              color: focused ? PRIMARY : "var(--color-text-tertiary)",
              pointerEvents: "none",
            }}
          >
            {icon}
          </span>
        )}

        <input
          type={actualType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            width: "100%",
            boxSizing: "border-box",
            padding: `9px ${type === "password" ? "38px" : "11px"} 9px ${icon ? "34px" : "11px"}`,
            fontSize: 14,
            borderRadius: "var(--border-radius-md)",
            border: `1px solid ${error ? "#E24B4A" : focused ? PRIMARY : "var(--color-border-secondary)"}`,
            background: "var(--color-background-secondary)",
            color: "var(--color-text-primary)",
            outline: "none",
          }}
        />

        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPass(!showPass)}
            style={{
              position: "absolute",
              right: 10,
              top: "50%",
              transform: "translateY(-50%)",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            {showPass ? "🙈" : "👁️"}
          </button>
        )}

        {rightElement && (
          <div style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)" }}>
            {rightElement}
          </div>
        )}
      </div>

      {error && <p style={{ margin: "4px 0 0", fontSize: 12, color: "#E24B4A" }}>{error}</p>}
    </div>
  );
}