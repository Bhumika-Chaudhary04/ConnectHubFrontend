import { COLORS } from "../utils/constants";
import StatusDot from "./StatusDot";

export default function Avatar({ initials, size = 36, color = COLORS.primary, status }) {
  return (
    <div style={{ position: "relative", display: "inline-flex", flexShrink: 0 }}>
      <div
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          background: color + "22",
          border: `1.5px solid ${color}44`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: size * 0.35,
          fontWeight: 500,
          color: color,
          userSelect: "none",
          flexShrink: 0,
        }}
      >
        {initials}
      </div>
      {status && (
        <span style={{ position: "absolute", bottom: 0, right: 0 }}>
          <StatusDot status={status} size={Math.max(8, size * 0.28)} />
        </span>
      )}
    </div>
  );
}