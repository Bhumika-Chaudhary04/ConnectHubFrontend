export default function RoomListItem({ room, isActive, onClick }) {
  const initials =
    room.avatar ||
    room.name
      ?.split(" ")
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join("") ||
    "RM";

  return (
    <button
      onClick={onClick}
      style={{
        width: "100%",
        border: isActive ? "1px solid rgba(99,102,241,0.18)" : "1px solid transparent",
        background: isActive
          ? "linear-gradient(135deg, rgba(139,92,246,0.14), rgba(99,102,241,0.10))"
          : "#ffffff",
        borderRadius: "20px",
        padding: "14px",
        display: "flex",
        alignItems: "center",
        gap: "12px",
        cursor: "pointer",
        textAlign: "left",
        boxShadow: isActive ? "0 12px 24px rgba(99, 102, 241, 0.08)" : "none",
        transition: "all 0.2s ease",
      }}
    >
      <div
        style={{
          width: "50px",
          height: "50px",
          borderRadius: "16px",
          background: isActive
            ? "linear-gradient(135deg, #c4b5fd, #a5b4fc)"
            : "#eef2ff",
          color: "#4338ca",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 800,
          fontSize: "15px",
          flexShrink: 0,
        }}
      >
        {initials}
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "10px",
            marginBottom: "4px",
          }}
        >
          <div
            style={{
              fontSize: "16px",
              fontWeight: 700,
              color: "#1f2937",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {room.name}
          </div>

          {room.time && (
            <div
              style={{
                fontSize: "12px",
                color: "#6b7280",
                flexShrink: 0,
              }}
            >
              {room.time}
            </div>
          )}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "10px",
          }}
        >
          <div
            style={{
              fontSize: "13px",
              color: "#6b7280",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: "170px",
            }}
          >
            {room.lastMessage || "No messages yet"}
          </div>

          {room.unreadCount > 0 && (
            <div
              style={{
                minWidth: "24px",
                height: "24px",
                padding: "0 8px",
                borderRadius: "999px",
                background: "linear-gradient(135deg, #8b5cf6, #6366f1)",
                color: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "12px",
                fontWeight: 700,
                flexShrink: 0,
              }}
            >
              {room.unreadCount}
            </div>
          )}
        </div>
      </div>
    </button>
  );
}