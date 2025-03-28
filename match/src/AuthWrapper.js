import { useEffect } from "react";
import axios from "axios";
import { replace, useLocation, useNavigate } from "react-router-dom";

export default function AuthWrapper({ setBool }) {
  const navigate = useNavigate();
  const location = useLocation();

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


        axios
        .get("https://api.uni-match.in/profilecomp", {
          withCredentials: true,
          headers: { "X-CSRF-TOKEN": localStorage.getItem("csrfTokenAccess") },
        })
        .then((response) => {
          console.log(response.data);
          setLpuSelfProfile(response.data.lpuselfprofile);
          setSelfProfile(response.data.selfprofile);
        })
        .catch((error) => {
          console.error("Error", error);

          if (error.response?.status === 401) {
            axios
              .post(
                "https://api.uni-match.in/refresh",
                {},
                {
                  withCredentials: true,
                  headers: {
                    "X-CSRF-TOKEN": localStorage.getItem("csrfTokenRefresh"),
                  },
                },
              )

              .then((response) => {
                const csrfTokenAccess = response.headers["x-csrf-token-access"];
                localStorage.setItem("csrfTokenAccess", csrfTokenAccess);

                axios
                  .get("https://api.uni-match.in/profilecomp", {
                    withCredentials: true,
                    headers: {
                      "X-CSRF-TOKEN": localStorage.getItem("csrfTokenAccess"),
                    },
                  })
                  .then((response) => {
                    console.log(
                      "Protected Data (After Refresh):",
                      response.data,
                    );
                    setLpuSelfProfile(response.data.lpuselfprofile);
                    setSelfProfile(response.data.selfprofile);
                  })
                  .catch((retryError) =>
                    console.error("Failed after refresh:", retryError),
                  );
              })
              .catch(() =>
                console.error("Session expired, please log in again."),
              );
          }
        })

      
        console.log("1",localStorage.getItem('login'))
        if (localStorage.getItem("login") === null) {
          console.log("2",localStorage.getItem('login'))
          navigate("/app/home", { replace: true });
        }
      })
      .catch(() => {
        console.log("Session expired, redirecting to login...");
      })
      .finally(() => {
        setTimeout(() => {
          setBool(true);
        }, 2000);
      });
  }, []);

  return null;
}
