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
        },
      )
      .then((response) => {
        console.log("Session restored! Navigating to dashboard...");

        const csrfTokenAccess = response.headers["x-csrf-token-access"];
        localStorage.setItem("csrfTokenAccess", csrfTokenAccess);
        navigate("/app/home", { replace: true });
      })
      .catch(() => {
        console.log("Session expired, redirecting to login...");
      })
      .finally(() => {
        setBool(true);
      });
  }, []);

  return null;
}
