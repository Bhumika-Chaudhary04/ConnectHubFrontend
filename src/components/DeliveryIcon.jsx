import { COLORS } from "../utils/constants";

export default function DeliveryIcon({ status }) {
  if (status === "READ") return <span style={{ color: COLORS.primary, fontSize: 12 }}>✓✓</span>;
  if (status === "DELIVERED") return <span style={{ color: "var(--color-text-tertiary)", fontSize: 12 }}>✓✓</span>;
  return <span style={{ color: "var(--color-text-tertiary)", fontSize: 12 }}>✓</span>;
}