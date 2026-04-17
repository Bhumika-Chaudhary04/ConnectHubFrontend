export default function ChatHeader({
  room,
  activeRightPanel,
  setActiveRightPanel,
}) {
  return (
    <div
      style={{
        padding: "18px 22px",
        borderBottom: "1px solid #eef2f7",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "rgba(255,255,255,0.95)",
      }}
    >
      {/* LEFT: ROOM INFO */}
      <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
        {/* Avatar */}
        <div
          style={{
            width: "48px",
            height: "48px",
            borderRadius: "14px",
            background: "linear-gradient(135deg, #c4b5fd, #a5b4fc)",
            color: "#312e81",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 800,
            fontSize: "14px",
          }}
        >
          {room.name
            ?.split(" ")
            .slice(0, 2)
            .map((w) => w[0])
            .join("")
            .toUpperCase()}
        </div>

        {/* Room text */}
        <div>
          <div
            style={{
              fontSize: "18px",
              fontWeight: 700,
              color: "#111827",
            }}
          >
            {room.name}
          </div>

          <div
            style={{
              fontSize: "13px",
              color: "#6b7280",
            }}
          >
            {room.members || 0} members • {room.online || 0} online
          </div>
        </div>
      </div>

      {/* RIGHT: ACTION BUTTONS */}
      <div style={{ display: "flex", gap: "10px" }}>
        <button
          onClick={() => setActiveRightPanel("members")}
          style={iconBtnStyle}
        >
          👥
        </button>

        <button
          onClick={() => setActiveRightPanel("notifications")}
          style={iconBtnStyle}
        >
          🔔
        </button>

        <button
          onClick={() => setActiveRightPanel("profile")}
          style={iconBtnStyle}
        >
          👤
        </button>
      </div>
    </div>
  );
}

/* 🔥 reusable style */
const iconBtnStyle = {
  width: "42px",
  height: "42px",
  borderRadius: "12px",
  border: "1px solid #e5e7eb",
  background: "#f9fafb",
  cursor: "pointer",
  fontSize: "16px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};