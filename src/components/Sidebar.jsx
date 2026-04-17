import RoomListItem from "./RoomListItem";

export default function Sidebar({
  rooms,
  selectedRoomId,
  onSelectRoom,
  search,
  setSearch,
  currentUser,
  onNewRoom,
  onLogout,
  loadingRooms,
}) {
  const displayName =
    localStorage.getItem("fullName") ||
    localStorage.getItem("username") ||
    currentUser?.name ||
    "User";

  const avatarText = displayName
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

  return (
    <aside
      style={{
        background: "rgba(255,255,255,0.88)",
        border: "1px solid rgba(99,102,241,0.10)",
        borderRadius: "28px",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 18px 40px rgba(79, 70, 229, 0.08)",
        backdropFilter: "blur(10px)",
        minHeight: 0,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "18px",
        }}
      >
        <div>
          <div
            style={{
              fontSize: "28px",
              fontWeight: 800,
              color: "#1f2937",
              letterSpacing: "-0.8px",
            }}
          >
            ConnectHub
          </div>
          <div
            style={{
              marginTop: "4px",
              fontSize: "13px",
              color: "#6b7280",
            }}
          >
            Your conversations, all in one place
          </div>
        </div>

        <div
          style={{
            width: "48px",
            height: "48px",
            borderRadius: "16px",
            background: "linear-gradient(135deg, #8b5cf6, #6366f1)",
            color: "#ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 800,
            fontSize: "15px",
            boxShadow: "0 12px 24px rgba(99, 102, 241, 0.25)",
          }}
        >
          {avatarText || "CH"}
        </div>
      </div>

      <div
        style={{
          background: "#f8fafc",
          border: "1px solid #e5e7eb",
          borderRadius: "18px",
          padding: "14px 16px",
          marginBottom: "16px",
        }}
      >
        <input
          type="text"
          placeholder="Search rooms..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "100%",
            border: "none",
            outline: "none",
            background: "transparent",
            fontSize: "14px",
            color: "#111827",
          }}
        />
      </div>

      <div
        style={{
          flex: 1,
          minHeight: 0,
          overflowY: "auto",
          paddingRight: "4px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        {loadingRooms ? (
          <div
            style={{
              textAlign: "center",
              color: "#6b7280",
              fontSize: "14px",
              padding: "30px 12px",
              background: "#f9fafb",
              borderRadius: "18px",
              border: "1px dashed #d1d5db",
            }}
          >
            Loading rooms...
          </div>
        ) : rooms.length > 0 ? (
          rooms.map((room) => (
            <RoomListItem
              key={room.id}
              room={room}
              isActive={selectedRoomId === room.id}
              onClick={() => onSelectRoom(room.id)}
            />
          ))
        ) : (
          <div
            style={{
              textAlign: "center",
              color: "#6b7280",
              fontSize: "14px",
              padding: "30px 12px",
              background: "#f9fafb",
              borderRadius: "18px",
              border: "1px dashed #d1d5db",
            }}
          >
            No rooms found
          </div>
        )}
      </div>

      <div
        style={{
          marginTop: "18px",
          paddingTop: "16px",
          borderTop: "1px solid #eef2f7",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "12px 14px",
            borderRadius: "18px",
            background: "#f8fafc",
            marginBottom: "14px",
          }}
        >
          <div
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "14px",
              background: "linear-gradient(135deg, #c4b5fd, #a5b4fc)",
              color: "#312e81",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 800,
            }}
          >
            {avatarText || "U"}
          </div>

          <div style={{ minWidth: 0 }}>
            <div
              style={{
                fontSize: "15px",
                fontWeight: 700,
                color: "#1f2937",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {displayName}
            </div>
            <div
              style={{
                fontSize: "13px",
                color: "#6b7280",
              }}
            >
              Online
            </div>
          </div>
        </div>

        <button
          onClick={onNewRoom}
          style={{
            width: "100%",
            padding: "13px 14px",
            border: "none",
            borderRadius: "16px",
            background: "linear-gradient(135deg, #8b5cf6, #6366f1)",
            color: "#ffffff",
            fontWeight: 700,
            fontSize: "15px",
            cursor: "pointer",
            boxShadow: "0 12px 24px rgba(99, 102, 241, 0.20)",
            marginBottom: "10px",
          }}
        >
          + New Room
        </button>

        <button
          onClick={onLogout}
          style={{
            width: "100%",
            padding: "12px 14px",
            borderRadius: "16px",
            background: "#ffffff",
            color: "#dc2626",
            border: "1px solid #fecaca",
            fontWeight: 700,
            fontSize: "14px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>
    </aside>
  );
}