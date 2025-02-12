import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import Match from "./Match";
import Navbar from "./NavBar";
import Profile from "./Profile";
import Likes from "./Likes";
import Chats from "./Chats";
import axios from "axios";

const user_id = 3;

export default function Dashboard() {
  const [value, setValue] = useState(0);
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/dashboard")
      .then((response) => {
        console.log("Message from server: ", response.data);
        setProfiles(response.data);
      })
      .catch((error) => {
        console.error("Error", error);
      });
  }, []);

  let profile;
  for (let a of profiles){
    if (a.user_id == user_id){
      profile = a
    }
  }

  function renderCompo() {
    switch (value) {
      case 0:
        return <Match profiles={profiles} user_id={user_id}/>;
      case 1:
        return <Likes user_id={user_id} />;
      case 2:
        return <Chats profile={profile} user_id={user_id} />;
      case 3:
        return <Profile profile={profile} user_id={user_id} />;
    }
  }

  return (
    <Box
      sx={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#ffbf00",
        overflow: "hidden",
      }}
    >
      <Box 
        sx={{
          backgroundColor: '#ffbf00',
          width: '100vw',
          height: '7vh',
          display: 'flex',
          justifyContent: 'left',
          alignItems: 'center',
        }}
      >
        <img 
          src={'/signs/Matchp.png'} 
          alt="Logo"
          style={{
            maxHeight: '100%',
            maxWidth: '100%', 
            objectFit: 'contain',
          }} 
        />
      </Box>

      <Box
        mt={1}
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "100vw",
          backgroundColor: '#ffbf00',
          height: "75vh", 
          position: "relative",
        }}
      >
        {renderCompo()}
      </Box>

      <Box
        sx={{
          width: "100%",
          height: "10vh",
          backgroundColor: "#ffbf00",
          position: "fixed",
          bottom: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Navbar value={value} onChange={(event, newValue) => setValue(newValue)} />
      </Box>
    </Box>
  );
}
