import { useState } from "react";
import { COLORS } from "../utils/constants";
import Avatar from "./Avatar";

export default function ProfilePanel({ user, onStatusChange }) {
  const [status, setStatus] = useState(user.status);
  const statuses = ["ONLINE", "AWAY", "DND", "INVISIBLE"];
  const labels = { ONLINE: "Online", AWAY: "Away", DND: "Do Not Disturb", INVISIBLE: "Invisible" };
  const colors = { ONLINE: COLORS.online, AWAY: COLORS.away, DND: COLORS.dnd, INVISIBLE: COLORS.invisible };

  return (
    <div
      style={{
        position: "absolute",
        top: 56,
        right: 12,
        width: 260,
        background: "var(--color-background-primary)",
        border: "0.5px solid var(--color-border-secondary)",
        borderRadius: "var(--border-radius-lg)",
        zIndex: 100,
        overflow: "hidden",
      }}
    >
      <div style={{ padding: "16px 14px", borderBottom: "0.5px solid var(--color-border-tertiary)", display: "flex", gap: 12, alignItems: "center" }}>
        <Avatar initials={user.avatar} size={44} status={status} />
        <div>
          <p style={{ margin: 0, fontWeight: 500, fontSize: 15, color: "var(--color-text-primary)" }}>{user.name}</p>
          <p style={{ margin: 0, fontSize: 12, color: "var(--color-text-secondary)" }}>@{user.username}</p>
        </div>
      </div>

      <div style={{ padding: "10px 14px", borderBottom: "0.5px solid var(--color-border-tertiary)" }}>
        <p style={{ margin: "0 0 8px", fontSize: 12, fontWeight: 500, color: "var(--color-text-secondary)" }}>Status</p>
        {statuses.map((s) => (
          <div
            key={s}
            onClick={() => {
              setStatus(s);
              onStatusChange(s);
            }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "6px 8px",
              cursor: "pointer",
              borderRadius: "var(--border-radius-md)",
              background: status === s ? COLORS.primaryLight : "transparent",
            }}
          >
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: colors[s] }} />
            <span style={{ fontSize: 13, color: status === s ? COLORS.primary : "var(--color-text-primary)", fontWeight: status === s ? 500 : 400 }}>
              {labels[s]}
            </span>
          </div>
        ))}
      </div>

      <div style={{ padding: "8px 0" }}>
        {["Edit profile", "Change password", "Settings", "Sign out"].map((item, i) => (
          <button
            key={i}
            style={{
              display: "block",
              width: "100%",
              textAlign: "left",
              padding: "8px 14px",
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: 13,
              color: i === 3 ? "#E24B4A" : "var(--color-text-primary)",
            }}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}