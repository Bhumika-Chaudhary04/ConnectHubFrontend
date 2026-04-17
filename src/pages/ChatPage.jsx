export default function ChatPage() {
  const handleLogout = () => {
    localStorage.removeItem("connecthub_token");
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    localStorage.removeItem("fullName");

    window.location.href = "/login";
  };

  return (
    <div>
      <h1>Chat Page</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}