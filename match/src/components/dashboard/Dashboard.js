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


const user_id = 3;

export default function Dashboard() {
  const [value, setValue] = useState(0);
  const [profiles, setProfiles] = useState([]);
  const [open, setOpen] = useState(false)
  const [profile, setSelfProfile] = useState(null)
  const [likesNoti, setLikesNoti] = useState([])
  const [matchesNoti, setMatchesNoti] = useState([])


  useEffect(() => {
    axios
      .post("http://127.0.0.1:5000/dashboard", {user_id})
      .then((response) => {
        console.log("Message from server: ", response.data);
        setProfiles(response.data.cards);
        setSelfProfile(response.data.selfprofile);

        console.log(response.data.likesNoti)
        setLikesNoti(response.data.likesNoti);
        console.log(response.data.matchesNoti)
        setMatchesNoti(response.data.matchesNoti);
      })
      .catch((error) => {
        console.error("Error", error);
      });
  }, []);

  
  

  function renderCompo() {
    switch (value) {
      case 0:
        return <Match profiles={profiles} user_id={user_id}/>;
      case 1:
        return <Likes user_id={user_id} setLikesNoti={setLikesNoti}/>;
      case 2:
        return <Chats profile={profile} user_id={user_id} setMatchesNoti={setMatchesNoti}/>;
      case 3:
        return <Profile profile={profile} user_id={user_id} />;
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

      <FilterModal open={open} setOpen={setOpen} setProfiles={setProfiles} user_id ={user_id}/>

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
