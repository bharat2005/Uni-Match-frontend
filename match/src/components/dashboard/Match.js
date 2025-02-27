import React, { useState } from "react";
import "../../App.css";
import { Box } from "@mui/material";
import TinderCard from "react-tinder-card";
import Card from "./Card";
import axios from 'axios';


export default function Match({ profiles, user_id }) {
  const [swipeStates, setSwipeStates] = useState({})

  const swiped = (direction, target_user_id) => {
    setSwipeStates((prevStates) => ({
      ...prevStates,
      [target_user_id]: direction
    }));

    axios.post('http://127.0.0.1:5000/swipeadd',{target_user_id, user_id, swipe_action: direction},{ withCredentials: true } )
    .then(responce => {
      console.log(responce.data.message)
    })
    .catch(error => {
      console.error("Error:",error)
    })
  };




  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="cardContainer">
        {profiles.map((profile) => (
          <TinderCard
            className="swipe"
            key={profile.user_id}
            onSwipe={(dir) => swiped(dir, profile.user_id)}
            preventSwipe={['up', 'down']}  
          >
            <Card profile={profile} lastDirection={swipeStates[profile.user_id]} />
          </TinderCard>
        ))}
      </div>
    </Box>
  );
}