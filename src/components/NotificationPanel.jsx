import { COLORS } from "../utils/constants";

export default function NotificationPanel({ notifications, onClose }) {
  const unread = notifications.filter((n) => !n.isRead);
  const icons = { MENTION: "💬", ROOM_INVITE: "📨", NEW_MESSAGE: "🔔" };

  return (
    <div
      style={{
        position: "absolute",
        top: 56,
        right: 12,
        width: 320,
        background: "var(--color-background-primary)",
        border: "0.5px solid var(--color-border-secondary)",
        borderRadius: "var(--border-radius-lg)",
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        zIndex: 100,
      }}
    >
      <div style={{ padding: "12px 14px 10px", borderBottom: "0.5px solid var(--color-border-tertiary)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontWeight: 500, fontSize: 14, color: "var(--color-text-primary)" }}>Notifications</span>
        <div style={{ display: "flex", gap: 8 }}>
          {unread.length > 0 && <span style={{ fontSize: 12, color: COLORS.primary, cursor: "pointer" }}>Mark all read</span>}
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 14, color: "var(--color-text-tertiary)", padding: 0 }}>✕</button>
        </div>
      </div>

      {notifications.map((n) => (
        <div key={n.id} style={{ padding: "10px 14px", borderBottom: "0.5px solid var(--color-border-tertiary)", background: n.isRead ? "transparent" : COLORS.primaryLight + "88", display: "flex", gap: 10, alignItems: "flex-start" }}>
          <span style={{ fontSize: 18 }}>{icons[n.type] || "🔔"}</span>
          <div>
            <p style={{ margin: 0, fontSize: 13, fontWeight: 500, color: "var(--color-text-primary)" }}>{n.title}</p>
            <p style={{ margin: "2px 0 0", fontSize: 12, color: "var(--color-text-secondary)" }}>{n.message}</p>
            <p style={{ margin: "2px 0 0", fontSize: 11, color: "var(--color-text-tertiary)" }}>{n.createdAt}</p>
          </div>
          {!n.isRead && <div style={{ width: 8, height: 8, borderRadius: "50%", background: COLORS.primary, flexShrink: 0, marginTop: 4 }} />}
        </div>
      ))}

      {notifications.length === 0 && <p style={{ padding: 20, textAlign: "center", color: "var(--color-text-tertiary)", fontSize: 13 }}>No notifications</p>}
    </div>
  );
}