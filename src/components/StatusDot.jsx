import { COLORS } from "../utils/constants";

export default function StatusDot({ status, size = 10 }) {
  const colors = {
    ONLINE: COLORS.online,
    AWAY: COLORS.away,
    DND: COLORS.dnd,
    INVISIBLE: COLORS.invisible,
  };

  return (
    <span
      style={{
        display: "inline-block",
        width: size,
        height: size,
        borderRadius: "50%",
        background: colors[status] || COLORS.invisible,
        border: "2px solid var(--color-background-primary)",
        flexShrink: 0,
      }}
    />
  );
}