export default function MessageBubble({ message }) {
  const isOwn = message.isOwn;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: isOwn ? "flex-end" : "flex-start",
      }}
    >
      <div
        style={{
          maxWidth: "65%",
          padding: "10px 14px",
          borderRadius: "16px",
          background: isOwn
            ? "linear-gradient(135deg, #8b5cf6, #6366f1)"
            : "#ffffff",
          color: isOwn ? "#fff" : "#111827",
          fontSize: "14px",
          boxShadow: "0 6px 16px rgba(0,0,0,0.06)",
        }}
      >
        {!isOwn && (
          <div
            style={{
              fontSize: "12px",
              fontWeight: 600,
              marginBottom: "4px",
              color: "#6b7280",
            }}
          >
            {message.senderName}
          </div>
        )}

        <div>{message.text}</div>

        <div
          style={{
            fontSize: "10px",
            marginTop: "6px",
            textAlign: "right",
            opacity: 0.7,
          }}
        >
          {message.timestamp}
        </div>
      </div>
    </div>
  );
}