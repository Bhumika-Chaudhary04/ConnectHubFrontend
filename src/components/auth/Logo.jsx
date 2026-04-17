const PRIMARY = "#5B5EA6";

export default function Logo() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, justifyContent: "center", marginBottom: 28 }}>
      <div
        style={{
          width: 38,
          height: 38,
          borderRadius: "50%",
          background: PRIMARY,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 18,
          color: "#fff",
          fontWeight: 700,
          flexShrink: 0,
        }}
      >
        C
      </div>
      <span style={{ fontSize: 22, fontWeight: 600, color: "var(--color-text-primary)" }}>
        ConnectHub
      </span>
    </div>
  );
}