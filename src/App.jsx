import { useEffect, useMemo, useRef, useState } from "react";
import ConnectHubAuth from "./pages/ConnectHubAuth";
import Sidebar from "./components/Sidebar";
import ChatWindow from "./components/ChatWindow";
import MembersPanel from "./components/MembersPanel";
import NotificationPanel from "./components/NotificationPanel";
import ProfilePanel from "./components/ProfilePanel";
import NewRoomModal from "./components/NewRoomModal";
import { ME } from "./data/mockData";
import { getUserRooms, createRoom } from "./services/roomService";
import { getMessagesByRoom } from "./services/messageService";
import {
  connectSocket,
  subscribeToRoom,
  sendSocketMessage,
  disconnectSocket,
} from "./services/socketService";

export default function App() {
  const subscribedRoomRef = useRef(null);
  const [socketConnected, setSocketConnected] = useState(false);

  useEffect(() => {
    const isOAuth = window.location.pathname === "/oauth-success";

    if (isOAuth) {
      const params = new URLSearchParams(window.location.search);
      const token = params.get("token");

      if (token) {
        localStorage.setItem("connecthub_token", token);
      }

      window.location.href = "/";
    }
  }, []);

  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("connecthub_token")
  );

  const [rooms, setRooms] = useState([]);
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const [messagesByRoom, setMessagesByRoom] = useState({});
  const [search, setSearch] = useState("");
  const [showNewRoomModal, setShowNewRoomModal] = useState(false);
  const [activeRightPanel, setActiveRightPanel] = useState(null);
  const [loadingRooms, setLoadingRooms] = useState(false);

  const fetchRooms = async () => {
    try {
      setLoadingRooms(true);
      const data = await getUserRooms();

      const mappedRooms = (data || []).map((room) => ({
        id: room.roomId,
        name: room.name,
        lastMessage: "Chat started",
        unreadCount: 0,
        members: room.memberCount || 0,
        online: 0,
        avatar: room.name
          ?.split(" ")
          .slice(0, 2)
          .map((w) => w[0]?.toUpperCase())
          .join(""),
        type: room.type,
      }));

      setRooms(mappedRooms);

      if (mappedRooms.length > 0) {
        setSelectedRoomId((prev) => prev || mappedRooms[0].id);
      }
    } catch (error) {
      console.error("FETCH ROOMS ERROR:", error);
    } finally {
      setLoadingRooms(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchRooms();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedRoomId) return;

      try {
        const data = await getMessagesByRoom(selectedRoomId);

        const mapped = (data || []).map((msg) => ({
          id: msg.id,
          senderId: msg.senderId,
          senderName: msg.senderName || "User",
          text: msg.content,
          timestamp: new Date(
            msg.sentAt || msg.createdAt || Date.now()
          ).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          isOwn: msg.senderId === localStorage.getItem("userId"),
          status: msg.deliveryStatus?.toLowerCase() || "sent",
        }));

        setMessagesByRoom((prev) => ({
          ...prev,
          [selectedRoomId]: mapped,
        }));
      } catch (err) {
        console.error("FETCH MESSAGES ERROR:", err);
      }
    };

    fetchMessages();
  }, [selectedRoomId]);

  useEffect(() => {
    if (!isAuthenticated) return;

    const token = localStorage.getItem("connecthub_token");

    connectSocket({
      token,
      onConnect: () => {
        console.log("WebSocket connected");
        setSocketConnected(true);
      },
      onError: (err) => {
        console.error("SOCKET ERROR:", err);
        setSocketConnected(false);
      },
    });

    return () => {
      disconnectSocket();
      setSocketConnected(false);
    };
  }, [isAuthenticated]);

  useEffect(() => {
    if (!isAuthenticated || !selectedRoomId || !socketConnected) return;

    if (subscribedRoomRef.current) {
      subscribedRoomRef.current.unsubscribe();
      subscribedRoomRef.current = null;
    }

    console.log("Subscribing to room:", selectedRoomId);

    const subscription = subscribeToRoom(selectedRoomId, (msg) => {
      const incomingMessage = {
        id: msg.id || Date.now().toString(),
        senderId: msg.senderId,
        senderName: msg.senderName || "User",
        text: msg.content,
        timestamp: new Date(
          msg.sentAt || msg.createdAt || Date.now()
        ).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        isOwn: msg.senderId === localStorage.getItem("userId"),
        status: msg.deliveryStatus?.toLowerCase() || "sent",
      };

      setMessagesByRoom((prev) => {
        const roomMessages = prev[selectedRoomId] || [];
        const alreadyExists = roomMessages.some(
          (m) => String(m.id) === String(incomingMessage.id)
        );

        if (alreadyExists) return prev;

        return {
          ...prev,
          [selectedRoomId]: [...roomMessages, incomingMessage],
        };
      });
    });

    subscribedRoomRef.current = subscription;

    return () => {
      if (subscribedRoomRef.current) {
        subscribedRoomRef.current.unsubscribe();
        subscribedRoomRef.current = null;
      }
    };
  }, [isAuthenticated, selectedRoomId, socketConnected]);

  const filteredRooms = useMemo(() => {
    if (!search.trim()) return rooms;
    return rooms.filter((r) =>
      r.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [rooms, search]);

  const selectedRoom = rooms.find((r) => r.id === selectedRoomId) || null;
  const selectedMessages = messagesByRoom[selectedRoomId] || [];

  const handleLoginSuccess = () => setIsAuthenticated(true);

  const handleLogout = () => {
    if (subscribedRoomRef.current) {
      subscribedRoomRef.current.unsubscribe();
      subscribedRoomRef.current = null;
    }

    disconnectSocket();
    setSocketConnected(false);

    localStorage.clear();
    setIsAuthenticated(false);
    setRooms([]);
    setSelectedRoomId(null);
    setMessagesByRoom({});
  };

  const handleSendMessage = async (text) => {
    if (!selectedRoom || !text.trim()) return;

    const senderId = localStorage.getItem("userId");

    sendSocketMessage({
      roomId: selectedRoom.id,
      senderId,
      content: text.trim(),
      mediaPath: null,
      mediaType: null,
    });
  };

  const handleCreateRoom = async (roomName) => {
    if (!roomName.trim()) return;

    try {
      const created = await createRoom({
        name: roomName.trim(),
        type: "GROUP",
        memberIds: [],
      });

      const newRoom = {
        id: created.roomId,
        name: created.name,
        lastMessage: "Room created",
        unreadCount: 0,
        members: 1,
        online: 0,
        avatar: created.name
          ?.split(" ")
          .slice(0, 2)
          .map((w) => w[0]?.toUpperCase())
          .join(""),
        type: created.type,
      };

      setRooms((prev) => [newRoom, ...prev]);
      setMessagesByRoom((prev) => ({
        ...prev,
        [newRoom.id]: [],
      }));
      setSelectedRoomId(newRoom.id);
      setShowNewRoomModal(false);
    } catch (err) {
      console.error("CREATE ROOM ERROR:", err);
    }
  };

  if (!isAuthenticated) {
    return <ConnectHubAuth onLogin={handleLoginSuccess} />;
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #f5f3ff 0%, #eef2ff 45%, #f8fafc 100%)",
        padding: "18px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          height: "calc(100vh - 36px)",
          display: "grid",
          gridTemplateColumns: activeRightPanel
            ? "320px minmax(0, 1fr) 320px"
            : "320px minmax(0, 1fr)",
          gap: "16px",
        }}
      >
        <Sidebar
          rooms={filteredRooms}
          selectedRoomId={selectedRoom?.id}
          onSelectRoom={setSelectedRoomId}
          search={search}
          setSearch={setSearch}
          currentUser={ME}
          onNewRoom={() => setShowNewRoomModal(true)}
          onLogout={handleLogout}
          loadingRooms={loadingRooms}
        />

        <ChatWindow
          room={selectedRoom}
          messages={selectedMessages}
          currentUser={ME}
          onSendMessage={handleSendMessage}
          activeRightPanel={activeRightPanel}
          setActiveRightPanel={setActiveRightPanel}
        />

        {activeRightPanel === "members" && (
          <MembersPanel
            room={selectedRoom}
            onClose={() => setActiveRightPanel(null)}
          />
        )}

        {activeRightPanel === "notifications" && (
          <NotificationPanel onClose={() => setActiveRightPanel(null)} />
        )}

        {activeRightPanel === "profile" && (
          <ProfilePanel
            currentUser={ME}
            onClose={() => setActiveRightPanel(null)}
          />
        )}
      </div>

      {showNewRoomModal && (
        <NewRoomModal
          onClose={() => setShowNewRoomModal(false)}
          onCreateRoom={handleCreateRoom}
        />
      )}
    </div>
  );
}