import React, { useState, useEffect } from "react";
import "../../App.css";
import { Box } from "@mui/material";
import TinderCard from "react-tinder-card";
import Card from "./Card";
import axios from 'axios';


export default function Match({ profiles, setProfiles }) {
  const [swipeStates, setSwipeStates] = useState({})

  useEffect(() => {
    axios
      .get("https://api.uni-match.in/matchcomp", {withCredentials: true, headers: { "X-CSRF-TOKEN": localStorage.getItem("csrfTokenAccess") }})
      .then((response) => {
        console.log(response.data)
        setProfiles(response.data.cards)
      })
      .catch((error) => {
        console.error("Error", error);

        if (error.response?.status === 401) {

          axios.post("https://api.uni-match.in/refresh", {}, { withCredentials:true, headers: { "X-CSRF-TOKEN": localStorage.getItem("csrfTokenRefresh") }} )

            .then((response) => {

              const csrfTokenAccess = response.headers["x-csrf-token-access"]
              localStorage.setItem("csrfTokenAccess", csrfTokenAccess)

                axios.get("https://api.uni-match.in/matchcomp", { withCredentials:true,  headers: { "X-CSRF-TOKEN": localStorage.getItem("csrfTokenAccess") } })
                .then((response) => {
                  console.log("Protected Data (After Refresh):", response.data)
                  setProfiles(response.data.cards);
                })
                .catch((retryError) => console.error("Failed after refresh:", retryError));
            })
            .catch(() => console.error("Session expired, please log in again."));
        }

      });
  }, []);



  const swiped = (direction, target_reg_no) => {
    setSwipeStates((prevStates) => ({
      ...prevStates,
      [target_reg_no]: direction
    }));

    axios.post('https://api.uni-match.in/swipeadd',{target_reg_no, swipe_action: direction}, {withCredentials: true, headers: { "X-CSRF-TOKEN": localStorage.getItem("csrfTokenAccess") }} )
    .then(responce => {
      console.log(responce.data.message)
    })
    .catch(error => {
      console.error("Error:",error)
      if (error.response?.status === 401) {

        axios.post("https://api.uni-match.in/refresh", {}, { withCredentials:true, headers: { "X-CSRF-TOKEN": localStorage.getItem("csrfTokenRefresh") }} )
  
          .then((response) => {
  
            const csrfTokenAccess = response.headers["x-csrf-token-access"]
            localStorage.setItem("csrfTokenAccess", csrfTokenAccess)
  
              axios.post("https://api.uni-match.in/swipeadd", {target_reg_no, swipe_action: direction}, { withCredentials:true,  headers: { "X-CSRF-TOKEN": localStorage.getItem("csrfTokenAccess") } })
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
            key={profile.reg_no}
            onSwipe={(dir) => swiped(dir, profile.reg_no)}
            preventSwipe={['up', 'down']}  
          >
            <Card profile={profile} lastDirection={swipeStates[profile.reg_no]} />
          </TinderCard>
        ))}
      </div>
    </Box>
  );
}