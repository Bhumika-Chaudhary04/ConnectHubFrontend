import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client/dist/sockjs.min.js";

let stompClient = null;

export const connectSocket = ({ token, onConnect, onError }) => {
  const socketUrl = "http://localhost:8083/ws";
  console.log("USING SOCKET URL =", socketUrl);

  stompClient = new Client({
    webSocketFactory: () => new SockJS(socketUrl),
    reconnectDelay: 5000,
    debug: (str) => console.log("STOMP:", str),
    connectHeaders: token
      ? {
          Authorization: `Bearer ${token}`,
        }
      : {},
    onConnect: () => {
      console.log("WebSocket connected successfully");
      onConnect?.();
    },
    onStompError: (frame) => {
      console.error("STOMP error:", frame);
      onError?.(frame);
    },
    onWebSocketError: (error) => {
      console.error("WebSocket error:", error);
      onError?.(error);
    },
  });

  stompClient.activate();
};

export const subscribeToRoom = (roomId, onMessage) => {
  if (!stompClient || !stompClient.connected) {
    console.warn("subscribeToRoom skipped: socket not connected");
    return null;
  }

  return stompClient.subscribe(`/topic/room/${roomId}`, (message) => {
    try {
      const parsed = JSON.parse(message.body);
      onMessage?.(parsed);
    } catch (error) {
      console.error("Error parsing room message:", error);
    }
  });
};

export const sendSocketMessage = (payload) => {
  if (!stompClient || !stompClient.connected) {
    console.error("WebSocket not connected");
    return;
  }

  stompClient.publish({
    destination: "/app/chat.send",
    body: JSON.stringify(payload),
  });
};

export const disconnectSocket = () => {
  if (stompClient) {
    stompClient.deactivate();
    stompClient = null;
  }
};