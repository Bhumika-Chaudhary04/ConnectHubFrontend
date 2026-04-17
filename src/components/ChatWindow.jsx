import { useEffect, useRef, useState } from "react";
import ChatHeader from "./ChatHeader";
import MessageBubble from "./MessageBubble";

export default function ChatWindow({
  room,
  messages,
  currentUser,
  onSendMessage,
  activeRightPanel,
  setActiveRightPanel,
}) {
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, room?.id]);

  const handleSend = async () => {
    if (!text.trim() || sending || !room) return;

    const messageText = text.trim();
    setText("");
    setSending(true);

    try {
      await onSendMessage(messageText);
    } catch (error) {
      console.error("CHAT WINDOW SEND ERROR:", error);
      setText(messageText);
    } finally {
      setSending(false);
    }
  };

  if (!room) {
    return (
      <div
        style={{
          background: "rgba(255,255,255,0.9)",
          border: "1px solid rgba(99,102,241,0.10)",
          borderRadius: "28px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#6b7280",
          boxShadow: "0 18px 40px rgba(79, 70, 229, 0.08)",
        }}
      >
        Select a room to start chatting
      </div>
    );
  }

  return (
    <div
      style={{
        background: "rgba(255,255,255,0.92)",
        border: "1px solid rgba(99,102,241,0.10)",
        borderRadius: "28px",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        boxShadow: "0 18px 40px rgba(79, 70, 229, 0.08)",
        minWidth: 0,
      }}
    >
      <ChatHeader
        room={room}
        activeRightPanel={activeRightPanel}
        setActiveRightPanel={setActiveRightPanel}
      />

      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "24px",
          background: "linear-gradient(180deg, #f9fafb 0%, #eef2ff 100%)",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          minHeight: 0,
        }}
      >
        {messages.length > 0 ? (
          <>
            {messages.map((msg) => (
              <MessageBubble
                key={msg.id}
                message={msg}
                currentUser={currentUser}
              />
            ))}
            <div ref={messagesEndRef} />
          </>
        ) : (
          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <div>
              <div style={{ fontSize: "42px", marginBottom: "10px" }}>💬</div>
              <div
                style={{
                  fontSize: "18px",
                  fontWeight: 700,
                  color: "#374151",
                  marginBottom: "6px",
                }}
              >
                Start the conversation
              </div>
              <div
                style={{
                  fontSize: "14px",
                  color: "#6b7280",
                }}
              >
                Send your first message in {room.name}
              </div>
            </div>
          </div>
        )}
      </div>

      <div
        style={{
          padding: "16px 20px",
          borderTop: "1px solid #e5e7eb",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          background: "#ffffff",
        }}
      >
        <button
          type="button"
          style={{
            width: "44px",
            height: "44px",
            borderRadius: "999px",
            border: "1px solid #e5e7eb",
            background: "#f9fafb",
            cursor: "pointer",
            fontSize: "18px",
            flexShrink: 0,
          }}
        >
          😊
        </button>

        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={sending ? "Sending..." : "Type a message..."}
          disabled={sending}
          style={{
            flex: 1,
            padding: "14px 18px",
            borderRadius: "999px",
            border: "1px solid #e5e7eb",
            outline: "none",
            fontSize: "14px",
            background: "#f9fafb",
            color: "#111827",
            opacity: sending ? 0.7 : 1,
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
        />

        <button
          type="button"
          style={{
            width: "44px",
            height: "44px",
            borderRadius: "999px",
            border: "1px solid #e5e7eb",
            background: "#f9fafb",
            cursor: "pointer",
            fontSize: "18px",
            flexShrink: 0,
          }}
        >
          📎
        </button>

        <button
          onClick={handleSend}
          disabled={!text.trim() || sending}
          style={{
            padding: "12px 18px",
            borderRadius: "999px",
            border: "none",
            background:
              !text.trim() || sending
                ? "#c7d2fe"
                : "linear-gradient(135deg, #8b5cf6, #6366f1)",
            color: "#fff",
            fontWeight: 700,
            cursor: !text.trim() || sending ? "not-allowed" : "pointer",
            boxShadow: "0 8px 16px rgba(99,102,241,0.25)",
            flexShrink: 0,
          }}
        >
          {sending ? "..." : "➤"}
        </button>
      </div>
    </div>
  );
}