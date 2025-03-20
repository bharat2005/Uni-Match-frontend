import * as React from "react";
import { Box, IconButton, Modal } from "@mui/material";
import Profilee from "./Profilee";
import NavBar from "./NavBar2";
import Chatsoo from "./Chatsoo";
import Likesoo from "./Likesoo";
import Matchesoo from "./Matchesoo";
import Match from "./Match";
import Modall from "./Modal";
import { Outlet, useLocation } from "react-router-dom";


function AppLayout() {
  const location = useLocation();
  const [activeTab, setActiveTab] = React.useState("clover");
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [likesNoti, setLikesNoti] = useState([]);
  const [matchesNoti, setMatchesNoti] = useState([]);
  //const [name, setName] = React.useState(false);
  const shouldShowHeader = location.pathname === "/app";

  // React.useEffect(() => {
  //   setName("noti");
  // }, []);

  useEffect(() => {
    axios
      .get("https://api.uni-match.in/dashboard", {
        withCredentials: true,
        headers: { "X-CSRF-TOKEN": localStorage.getItem("csrfTokenAccess") },
      })
      .then((response) => {
        console.log(response.data);
        setLikesNoti(response.data.likesNoti);
        setMatchesNoti(response.data.matchesNoti);
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
                .get("https://api.uni-match.in/dashboard", {
                  withCredentials: true,
                  headers: {
                    "X-CSRF-TOKEN": localStorage.getItem("csrfTokenAccess"),
                  },
                })
                .then((response) => {
                  console.log("Protected Data (After Refresh):", response.data);
                  setLikesNoti(response.data.likesNoti);
                  setMatchesNoti(response.data.matchesNoti);
                })
                .catch((retryError) =>
                  console.error("Failed after refresh:", retryError),
                );
            })
            .catch(() =>
              console.error("Session expired, please log in again."),
            );
        }
      });
  }, []);

  return (
    <>
      {/* <Modall setModalOpen={setName} modalOpen={name} name={name} /> */}
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/dist/tabler-icons.min.css"
      />{" "}
      <Box
        sx={{
          background:
            "linear-gradient(32.33deg, #FEEDFB 40.6%, #FEE5EC 58.42%, #F5E6FF 79.81%, #BFEAFF 100%)",
          //background:'red',
          height: "100vh",
          width: "100vw",
          display: "flex",

          flexDirection: "column",
          position: "relative",
        }}
      >
      


        <Box sx={{ flex: 1 }}>
          <Outlet />
        </Box>

        <NavBar likesNoti={likesNoti} setLikesNoti={setLikesNoti} />
       
      </Box>
    </>
  );
}

export default AppLayout;
