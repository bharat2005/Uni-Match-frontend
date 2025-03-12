import React, { useState, useMemo, useRef } from "react";
import "../../App.css";
import { Box, Button } from "@mui/material";
import TinderCard from "react-tinder-card";
import Card from "./Card";
import axios from 'axios';





const db = [
  { reg_no: '12432322', reason: 'Casual Dating', age: 19, name: 'Bharat', images: [null, null, '/1.jpg', '/2.jpg', null, null] },
  { reg_no: '12432323', reason: 'Serious Relationship', age: 21, name: 'Rahul', images: [null, null, '/1.jpg', '/2.jpg', null, null] },
  { reg_no: '12432324', reason: 'Friendship', age: 22, name: 'Ankit', images: [null, null, '/1.jpg', '/2.jpg', null, null] },
  { reg_no: '12432325', reason: 'Networking', age: 23, name: 'Amit', images: [null, null, '/1.jpg', '/2.jpg', null, null] }
];




export default function Match({ profiles, setProfiles }) {

    const [currentIndex, setCurrentIndex] = useState(db.length - 1)
  
    
    const currentIndexRef = useRef(currentIndex)
  
    const childRefs = useMemo(
      () =>
        Array(db.length)
          .fill(0)
          .map((i) => React.createRef()),
      []
    )

    const updateCurrentIndex = (val) => {
      setCurrentIndex(val)
      currentIndexRef.current = val
    }
  
    const canSwipe = currentIndex >= 0;
    const swiped = (direction, nameToDelete, index) => {
     
      updateCurrentIndex(index - 1)
    }
  
    const outOfFrame = (name, idx) => {
      console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current)
      currentIndexRef.current >= idx && childRefs[idx].current.restoreCard()
    }
  
    const swipe = (dir) => {
      if (canSwipe && currentIndex < db.length) {
         childRefs[currentIndex].current.swipe(dir) 
      }
    }
  




  // useEffect(() => {
  //   axios
  //     .get("https://api.uni-match.in/matchcomp", { withCredentials: true, headers: { "X-CSRF-TOKEN": localStorage.getItem("csrfTokenAccess") }})
  //     .then((response) => {
  //       console.log(response.data);
  //       setProfiles(response.data.cards);
  //     })
  //     .catch((error) => {
  //       console.error("Error", error);
  //       if (error.response?.status === 401) {
  //         axios.post("https://api.uni-match.in/refresh", {}, { withCredentials: true, headers: { "X-CSRF-TOKEN": localStorage.getItem("csrfTokenRefresh") }})
  //           .then((response) => {
  //             const csrfTokenAccess = response.headers["x-csrf-token-access"];
  //             localStorage.setItem("csrfTokenAccess", csrfTokenAccess);
  //             axios.get("https://api.uni-match.in/matchcomp", { withCredentials: true, headers: { "X-CSRF-TOKEN": localStorage.getItem("csrfTokenAccess") }})
  //               .then((response) => {
  //                 console.log("Protected Data (After Refresh):", response.data);
  //                 setProfiles(response.data.cards);
  //               })
  //               .catch((retryError) => console.error("Failed after refresh:", retryError));
  //           })
  //           .catch(() => console.error("Session expired, please log in again."));
  //       }
  //     });
  // }, []);

  

  //   axios.post('https://api.uni-match.in/swipeadd', { target_reg_no, swipe_action: direction }, 
  //   { withCredentials: true, headers: { "X-CSRF-TOKEN": localStorage.getItem("csrfTokenAccess") }})
  //     .then(response => {
  //       console.log(response.data.message);
  //     })
  //     .catch(error => {
  //       console.error("Error:", error);
  //       if (error.response?.status === 401) {
  //         axios.post("https://api.uni-match.in/refresh", {}, 
  //         { withCredentials: true, headers: { "X-CSRF-TOKEN": localStorage.getItem("csrfTokenRefresh") }})
  //           .then((response) => {
  //             const csrfTokenAccess = response.headers["x-csrf-token-access"];
  //             localStorage.setItem("csrfTokenAccess", csrfTokenAccess);
  //             axios.post("https://api.uni-match.in/swipeadd", { target_reg_no, swipe_action: direction }, 
  //             { withCredentials: true, headers: { "X-CSRF-TOKEN": localStorage.getItem("csrfTokenAccess") }})
  //               .then((response) => {
  //                 console.log("Protected Data (After Refresh):", response.data);
  //               })
  //               .catch((retryError) => console.error("Failed after refresh:", retryError));
  //           })
  //           .catch(() => console.error("Session expired, please log in again."));
  //       }
  //     });
  // };




  return (<>
    <Box  sx={{
  width:'100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column', // Stack cards and buttons vertically
        position: 'relative',
}}>
      {db.map((profile, index) => (
        <TinderCard
          className="swipe"
          key={profile.reg_no}
          ref={childRefs[index]}
          preventSwipe={['up', 'down']}
          onSwipe={(dir) => swiped(dir, profile.name, index)}
          onCardLeftScreen={() => outOfFrame(profile.name, index)}
        >
          <Card profile={profile}  />
        </TinderCard>
      ))}

<Box
        display="flex"
        justifyContent="center"
        gap={12}
        //mt={2} // Space between cards and buttons
        sx={{
          position: 'absolute', // Position the buttons at the bottom
          bottom: '16%', // Adjust as needed
          zIndex: 1,
        }}
      >  <Button
      variant="contained"
      onClick={() => swipe("left")}
      sx={{
        background: "linear-gradient(145deg, #ff7aa7 0%, #ff6a9c 50%, #ff4d74 100%)", // Soft pink-red gradient (Bad action)
        borderRadius: "50%", // Circular shape for a cute look
        width: "90px", // Size of the button
        height: "90px", // Size of the button
        boxShadow: "none",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        transition: "all 0.3s ease-in-out",
        "&:hover": {
          background: "linear-gradient(145deg, #ff6a9c 0%, #ff4d74 70%)", // Slightly darker red hover effect
          boxShadow: "0 4px 20px rgba(255, 0, 0, 0.3)", // Glow effect on hover
        },
        "&:focus": {
          boxShadow: "0 4px 20px rgba(255, 0, 0, 0.3)", // Soft red glow when focused
        },
        "&:active": {
          transform: "scale(0.9)", // Slightly scale down on click (press effect)
          boxShadow: "0 2px 10px rgba(255, 0, 0, 0.4)", // Slightly different glow effect on active
        },
      }}
    >
      <i className="ti ti-x" style={{ fontSize: "50px", color: "white" }} />
    </Button>

    {/* Right Swipe Button */}
    <Button
      variant="contained"
      onClick={() => swipe("right")}
      sx={{
        background: "linear-gradient(145deg, #94c9ff 0%, #6fafff 40%, #4a90e2 100%)", // Soft pastel blue gradient (Good action)
        borderRadius: "50%", // Circular shape for a cute look
        width: "90px", // Size of the button
        height: "90px", // Size of the button
        boxShadow: "none",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        transition: "all 0.3s ease-in-out",
        "&:hover": {
          background: "linear-gradient(145deg, #6fafff 0%, #4a90e2 70%)", // Slightly darker blue hover effect
          boxShadow: "0 4px 20px rgba(0, 255, 255, 0.3)", // Soft blue glow on hover
        },
        "&:focus": {
          boxShadow: "0 4px 20px rgba(0, 255, 255, 0.3)", // Soft cyan glow when focused
        },
        "&:active": {
          transform: "scale(0.9)", // Slightly scale down on click (press effect)
          boxShadow: "0 2px 10px rgba(0, 255, 255, 0.4)", // Slightly different glow effect on active
        },
      }}
    >
      <i className="ti ti-heart-filled" style={{ fontSize: "50px", color: "white" }} />
    </Button>





      </Box>



    </Box>

  

  </>
  );
}
