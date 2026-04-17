import { useState } from "react";
import { COLORS } from "../utils/constants";
import { MOCK_USERS, ME } from "../data/mockData";
import Avatar from "./Avatar";

export default function NewRoomModal({ onClose, onCreateRoom }) {
  const [name, setName] = useState("");
  const [type, setType] = useState("GROUP");
  const [selected, setSelected] = useState([]);

  const toggle = (id) => {
    setSelected((s) =>
      s.includes(id) ? s.filter((x) => x !== id) : [...s, id]
    );
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.4)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 200,
      }}
    >
      <div
        style={{
          background: "var(--color-background-primary)",
          borderRadius: "var(--border-radius-lg)",
          width: 380,
          padding: 24,
          border: "0.5px solid var(--color-border-secondary)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
          <h3 style={{ margin: 0 }}>Create room</h3>
          <button onClick={onClose}>✕</button>
        </div>

        {/* TYPE */}
        <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
          {["GROUP", "DM"].map((t) => (
            <button key={t} onClick={() => setType(t)}>
              {t === "GROUP" ? "Group room" : "Direct message"}
            </button>
          ))}
        </div>

        {/* ROOM NAME */}
        {type === "GROUP" && (
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Room name..."
          />
        )}

        <p>Add members</p>

        {/* USERS */}
        <div>
          {MOCK_USERS.filter((u) => u.id !== ME.id).map((u) => (
            <div key={u.id} onClick={() => toggle(u.id)}>
              <Avatar initials={u.avatar} />
              <span>{u.name}</span>
              {selected.includes(u.id) && <span>✓</span>}
            </div>
          ))}
        </div>

        {/* CREATE BUTTON */}
        <button
          onClick={() => {
            const roomName =
              type === "GROUP"
                ? name
                : MOCK_USERS.find((u) => u.id === selected[0])?.name;

            if (!roomName) return;

            // ✅ ONLY SEND STRING
            onCreateRoom(roomName);

            onClose();
          }}
        >
          Create
        </button>
      </div>
    </div>
  );
}