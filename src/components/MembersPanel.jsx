import { MOCK_USERS, ME } from "../data/mockData";
import Avatar from "./Avatar";

export default function MembersPanel({ room }) {
  const members = room.members.map((id) => MOCK_USERS.find((u) => u.id === id)).filter(Boolean);

  return (
    <div style={{ width: 220, borderLeft: "0.5px solid var(--color-border-tertiary)", display: "flex", flexDirection: "column", background: "var(--color-background-primary)", flexShrink: 0 }}>
      <div style={{ padding: "14px 14px 10px", borderBottom: "0.5px solid var(--color-border-tertiary)" }}>
        <p style={{ margin: 0, fontWeight: 500, fontSize: 14, color: "var(--color-text-primary)" }}>Members ({members.length})</p>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "8px 0" }}>
        {members.map((m) => (
          <div key={m.id} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 12px" }}>
            <Avatar initials={m.avatar} size={30} status={m.status} />
            <div>
              <p style={{ margin: 0, fontSize: 13, fontWeight: m.id === ME.id ? 500 : 400, color: "var(--color-text-primary)" }}>
                {m.name}
                {m.id === ME.id ? " (you)" : ""}
              </p>
              <p style={{ margin: 0, fontSize: 11, color: "var(--color-text-tertiary)" }}>
                {m.status.charAt(0) + m.status.slice(1).toLowerCase()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}