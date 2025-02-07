import React, { useState } from 'react'
import '../../App.css';
import { Box, Container, Typography } from '@mui/material';
import TinderCard from 'react-tinder-card'

let me = {
  images:['/me.jpg','/me.jpg','/me.jpg'],
  name: 'Sammy',
  age: '19',
  reason: '🎉Casual Dating',
};


export default function App() {
    const [lastDirection, setLastDirection] = useState()
  
    const swiped = (direction, nameToDelete) => {
      console.log('removing ' + nameToDelete +' to '+ direction)
      setLastDirection(direction)
    }
  
    const outOfFrame = (name) => {
      console.log(name + ' left the screen!')
    }



  return (
      <Box sx={{
        width:'100%',
        height:'100%',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        }}>
          
        <div className='cardContainer'>
        {[...Array(30)].map((item,index) =>
          <TinderCard className='swipe' key={index} onSwipe={(dir) => swiped(dir, index)} onCardLeftScreen={() => outOfFrame(index)}>
          <Box sx={{
            position: 'relative',
            backgroundColor: 'black',
            width: '350px',
            height: '500px',
            boxShadow: 'inset 0px -80px 40px 0px black',
            borderRadius: '8px',
            backgroundImage:`url(${me.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            }}>
            
            <Typography
                variant="h6"
                sx={{
                  position: "absolute",
                  bottom: "35px", 
                  left: "15px",
                  fontWeight: "bold",
                  zIndex: 2,
                  fontSize: "25px",
                  color: "white",
                }}
              >
               {me.name}, {me.age}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  position: "absolute",
                  bottom: "15px",
                  left: "12px",
                  zIndex: 2,
                  fontSize: "15px", 
                  color: "white", 
                }}
              >
                {me.reason}
              </Typography>
            </Box>
          </TinderCard>
        )}
      </div>
  
 </Box>
  )
}


