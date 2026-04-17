export default function TypingDots() {
  return (
    <div style={{ display: "flex", gap: 3, alignItems: "center", padding: "4px 8px" }}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "var(--color-text-tertiary)",
            animation: `bounce 1.2s ${i * 0.2}s infinite`,
          }}
        />
      ))}
      <style>{`@keyframes bounce { 0%,80%,100% { transform: translateY(0); } 40% { transform: translateY(-5px); } }`}</style>
    </div>
  );
}