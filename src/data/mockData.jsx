export const MOCK_USERS = [
  { id: "u1", name: "Aarav Shah", username: "aarav", avatar: "AS", status: "ONLINE", bio: "Full-stack dev" },
  { id: "u2", name: "Priya Mehta", username: "priya", avatar: "PM", status: "AWAY", bio: "UI/UX Designer" },
  { id: "u3", name: "Rohan Gupta", username: "rohan", avatar: "RG", status: "ONLINE", bio: "Backend engineer" },
  { id: "u4", name: "Sneha Iyer", username: "sneha", avatar: "SI", status: "DND", bio: "DevOps specialist" },
  { id: "u5", name: "Vikram Nair", username: "vikram", avatar: "VN", status: "INVISIBLE", bio: "Data scientist" },
];

export const MOCK_ROOMS = [
  { id: "r1", name: "General", type: "GROUP", avatar: "GN", lastMessage: "Hey everyone!", lastMessageAt: "10:42 AM", unread: 3, members: ["u1","u2","u3","u4","u5"] },
  { id: "r2", name: "Engineering", type: "GROUP", avatar: "EN", lastMessage: "Deploying v2.1 tonight", lastMessageAt: "9:15 AM", unread: 0, members: ["u1","u3","u4"] },
  { id: "r3", name: "Priya Mehta", type: "DM", avatar: "PM", lastMessage: "Sent the designs!", lastMessageAt: "Yesterday", unread: 1, members: ["u1","u2"] },
  { id: "r4", name: "Rohan Gupta", type: "DM", avatar: "RG", lastMessage: "Sure, let's sync", lastMessageAt: "Monday", unread: 0, members: ["u1","u3"] },
  { id: "r5", name: "Design Team", type: "GROUP", avatar: "DT", lastMessage: "Wireframes are ready", lastMessageAt: "Sunday", unread: 7, members: ["u1","u2","u5"] },
];

export const MOCK_MESSAGES = {
  r1: [
    { id: "m1", senderId: "u2", content: "Good morning everyone!", type: "TEXT", sentAt: "10:30 AM", deliveryStatus: "READ", reactions: [] },
    { id: "m2", senderId: "u3", content: "Morning! Ready for the standup?", type: "TEXT", sentAt: "10:32 AM", deliveryStatus: "READ", reactions: [{ emoji: "👍", senderId: "u2" }] },
    { id: "m3", senderId: "u1", content: "Yes! Let me pull up the board", type: "TEXT", sentAt: "10:35 AM", deliveryStatus: "READ", reactions: [] },
    { id: "m4", senderId: "u4", content: "CI pipeline is green, good to go!", type: "TEXT", sentAt: "10:38 AM", deliveryStatus: "READ", reactions: [{ emoji: "🚀", senderId: "u1" }, { emoji: "🎉", senderId: "u3" }] },
    { id: "m5", senderId: "u2", content: "Hey everyone!", type: "TEXT", sentAt: "10:42 AM", deliveryStatus: "DELIVERED", reactions: [] },
  ],
  r2: [
    { id: "m6", senderId: "u3", content: "PR is up for review — WebSocket session management refactor", type: "TEXT", sentAt: "9:00 AM", deliveryStatus: "READ", reactions: [] },
    { id: "m7", senderId: "u4", content: "On it. Also, Redis config needs updating for the new cluster", type: "TEXT", sentAt: "9:10 AM", deliveryStatus: "READ", reactions: [] },
    { id: "m8", senderId: "u3", content: "Deploying v2.1 tonight", type: "TEXT", sentAt: "9:15 AM", deliveryStatus: "DELIVERED", reactions: [] },
  ],
  r3: [
    { id: "m9", senderId: "u2", content: "Hi! I've finished the chat UI mockups", type: "TEXT", sentAt: "Yesterday", deliveryStatus: "READ", reactions: [] },
    { id: "m10", senderId: "u1", content: "Amazing! Can you share them?", type: "TEXT", sentAt: "Yesterday", deliveryStatus: "READ", reactions: [] },
    { id: "m11", senderId: "u2", content: "Sent the designs!", type: "TEXT", sentAt: "Yesterday", deliveryStatus: "DELIVERED", reactions: [{ emoji: "❤️", senderId: "u1" }] },
  ],
  r4: [
    { id: "m12", senderId: "u3", content: "Hey, can we sync on the message service?", type: "TEXT", sentAt: "Monday", deliveryStatus: "READ", reactions: [] },
    { id: "m13", senderId: "u1", content: "Sure, let's sync", type: "TEXT", sentAt: "Monday", deliveryStatus: "READ", reactions: [] },
  ],
  r5: [
    { id: "m14", senderId: "u2", content: "New brand color palette is ready for review", type: "TEXT", sentAt: "Sunday", deliveryStatus: "READ", reactions: [] },
    { id: "m15", senderId: "u5", content: "Wireframes are ready", type: "TEXT", sentAt: "Sunday", deliveryStatus: "DELIVERED", reactions: [] },
  ],
};

export const MOCK_NOTIFICATIONS = [
  { id: "n1", type: "MENTION", title: "Aarav mentioned you", message: "@priya can you check the designs?", isRead: false, createdAt: "10 min ago" },
  { id: "n2", type: "ROOM_INVITE", title: "Room invite", message: "Rohan invited you to Engineering", isRead: false, createdAt: "1 hr ago" },
  { id: "n3", type: "NEW_MESSAGE", title: "New message from Sneha", message: "CI pipeline is green, good to go!", isRead: true, createdAt: "2 hrs ago" },
];

export const ME = { id: "u1", name: "Aarav Shah", username: "aarav", avatar: "AS", status: "ONLINE" };