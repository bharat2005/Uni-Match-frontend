import React, { useState } from "react";
import "../../App.css";
import { Box } from "@mui/material";
import TinderCard from "react-tinder-card";
import Card from "./Card";
import axios from 'axios';


export default function Match({ profiles }) {
  const [swipeStates, setSwipeStates] = useState({})

  const swiped = (direction, target_reg_no) => {
    setSwipeStates((prevStates) => ({
      ...prevStates,
      [target_reg_no]: direction
    }));

    axios.post('https://api.uni-match.in/swipeadd',{target_reg_no, swipe_action: direction}, {withCredentials: true, headers: { "X-CSRF-TOKEN": localStorage.getItem("csrfToken") }} )
    .then(responce => {
      console.log(responce.data.message)
    })
    .catch(error => {
      console.error("Error:",error)
      if (error.response?.status === 401) {

        axios.post("/refresh", {}, { withCredentials:true})
  
          .then((refreshResponse) => {
  
              const csrfToken = refreshResponse.headers["x-csrf-token"]
              localStorage.setItem("csrfToken", csrfToken)
  
              axios.post("https://api.uni-match.in/swipeadd", {target_reg_no, swipe_action: direction}, { withCredentials:true,  headers: { "X-CSRF-TOKEN": localStorage.getItem("csrfToken") } })
              .then((response) => {
                console.log("Protected Data (After Refresh):", response.data)
              })
              .catch((retryError) => console.error("Failed after refresh:", retryError));
          })
          .catch(() => console.error("Session expired, please log in again."));
      }
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