import { useEffect } from "react";

export default function OAuthSuccess() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("connecthub_token", token);
    }

    // redirect to main page
    window.location.href = "/";
  }, []);

  return <div>Logging you in...</div>;
}