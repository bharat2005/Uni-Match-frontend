import { useEffect } from "react";
import axios from "axios";
import { replace, useNavigate } from "react-router-dom";

export default function AuthWrapper({ setBool }) {
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .post(
        "https://api.uni-match.in/refresh",
        {},
        {
          withCredentials: true,
          headers: { "X-CSRF-TOKEN": localStorage.getItem("csrfTokenRefresh") },
        }
      )
      .then((response) => {
        console.log("Session restored! Staying on the same page...");

        // Store the new access token
        const csrfTokenAccess = response.headers["x-csrf-token-access"];
        localStorage.setItem("csrfTokenAccess", csrfTokenAccess);

        // ⚠️ Don't force navigation – Let React Router handle it
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