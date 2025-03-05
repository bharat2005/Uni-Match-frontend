import React, { useEffect, useState } from "react";
import { Box, Button, Badge} from "@mui/material";
import Match from "./Match";
import Navbar from "./NavBar";
import Profile from "./Profile";
import Likes from "./Likes";
import Chats from "./Chats";
import axios from "axios";
import { AdjustmentsVerticalIcon } from '@heroicons/react/24/solid';
import FilterModal from './FilterModal';


export default function Dashboard() {
  const [value, setValue] = useState(() => {
    return localStorage.getItem("value") ? parseInt(localStorage.getItem("value"), 10) : 0;
  });
  const [profiles, setProfiles] = useState([]);
  const [open, setOpen] = useState(false)
  const [profile, setSelfProfile] = useState({})
  const [lpuselfprofile, setLpuSelfProfile] = useState({})
  const [likesNoti, setLikesNoti] = useState([])
  const [matchesNoti, setMatchesNoti] = useState([])

  useEffect(() => {
    if (value) {
      localStorage.setItem("value", value);
    } else {
      localStorage.removeItem("value")
    }
  }, [value]);

  useEffect(() => {
    axios
      .get("https://api.uni-match.in/dashboard", {withCredentials: true, headers: { "X-CSRF-TOKEN": localStorage.getItem("csrfTokenAccess") }})
      .then((response) => {
        console.log(response.data)
        setLikesNoti(response.data.likesNoti);
        setMatchesNoti(response.data.matchesNoti);
      })
      .catch((error) => {
        console.error("Error", error);

        if (error.response?.status === 401) {

          axios.post("https://api.uni-match.in/refresh", {}, { withCredentials:true, headers: { "X-CSRF-TOKEN": localStorage.getItem("csrfTokenRefresh") }} )

            .then((response) => {

              const csrfTokenAccess = response.headers["x-csrf-token-access"]
              localStorage.setItem("csrfTokenAccess", csrfTokenAccess)

                axios.get("https://api.uni-match.in/dashboard", { withCredentials:true,  headers: { "X-CSRF-TOKEN": localStorage.getItem("csrfTokenAccess") } })
                .then((response) => {
                  console.log("Protected Data (After Refresh):", response.data)
                  setLikesNoti(response.data.likesNoti);
                  setMatchesNoti(response.data.matchesNoti);
                })
                .catch((retryError) => console.error("Failed after refresh:", retryError));
            })
            .catch(() => console.error("Session expired, please log in again."));
        }

      });
  }, []);

  
  

  function renderCompo() {
    switch (value) {
      case 0:
        return <Match profiles={profiles} setProfiles={setProfiles}/>;
      case 1:
        return <Likes setLikesNoti={setLikesNoti}/>;
      case 2:
        return <Chats profile={profile} setMatchesNoti={setMatchesNoti}/>;
      case 3:
        return <Profile lpuselfprofile={lpuselfprofile} profile={profile} setLpuSelfProfile={setLpuSelfProfile} setSelfProfile={setSelfProfile} />;
    }
  }

  return (<>

    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: "100vh",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "white",
        overflow: "hidden",
        
      }}
    >
      <Box 
        sx={{
          backgroundColor: 'white',
          width: '100%',
          height: '6vh',
          padding:1,
          display: 'flex',
          justifyContent: 'left',
          alignItems: 'center',
          borderBottom: "1px solid #e0e0e0",
        }}
      >
        <img 
          src={'/signs/Matchp.png'} 
          alt="Logo"
          style={{
            marginLeft:'3%',
            maxHeight: '100%',
            maxWidth: '100%', 
            objectFit: 'contain',
          }} 
        />
      </Box>

      <FilterModal open={open} setOpen={setOpen} setProfiles={setProfiles}/>

      <Box sx={{display:'flex', width:'100%',  justifyContent:'right'}}>
      {value === 0 && <Button size="small" onClick={()=>setOpen(true)} sx={{ display:'flex', width:'1%', justifyContent:'center',color:'black !important'}}><AdjustmentsVerticalIcon style={{width:'65%'}}/></Button>}
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          backgroundColor: 'white',
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
          backgroundColor: "white",
          position: "fixed",
          bottom: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Navbar value={value} onChange={(event, newValue) => setValue(newValue)} likesNoti={likesNoti} matchesNoti={matchesNoti} />
      </Box>
    </Box></>
  );
}
