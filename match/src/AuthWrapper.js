import { useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

export default function AuthWrapper({ setBool }) {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    axios
      .post(
        "https://api.uni-match.in/refresh",
        {},
        { withCredentials: true }
      )
      .then((response) => {
        console.log("Session restored!");

        // Store new access token
        const csrfTokenAccess = response.headers["x-csrf-token-access"];
        localStorage.setItem("csrfTokenAccess", csrfTokenAccess);

        // ✅ Navigate based on the current path
        if (location.pathname.startsWith("/app")) {
          // 🔄 Keep user on the same page
          navigate(location.pathname, { replace: true });
        } else {
          // 🚀 If no valid path, send to /app/home
          navigate("/app/home", { replace: true });
        }
      })
      .catch(() => {
        console.log("Session expired, redirecting to login...");
        navigate("/", { replace: true });
      })
      .finally(() => {
        setBool(true);
      });
  }, []);

  return null;
}
