import React, { useState, useEffect } from "react";
import { Box, Typography, Avatar, List, ListItem, ListItemAvatar, ListItemText, Tabs, Tab, CircularProgress, IconButton } from "@mui/material";
import axios from 'axios';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';



export default function Likes({user_id}) {
  const [likesList, setLikesList] = useState(null); 
  const [value, setValue] = useState(0);  
  const [load, setLoad] = useState(false)

  useEffect(() => {
    axios
      .post('http://127.0.0.1:5000/likes', { user_id })
      .then(response => {
        console.log(response.data)
        setLikesList(response.data); 
      })
      .catch(error => {
        console.error("Error: ", error);
      });
  }, []);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

let filteredList;
if (likesList){
  filteredList = value === 0 ? likesList.likedByYou : likesList.likesYou
}




function handleLikeClick(target_user_id){
  setLoad(true)
    axios.post('http://127.0.0.1:5000/match',{user_id:user_id, target_user_id: target_user_id,swipe_action:'right' })
    .then(responce => {
      console.log(responce.data.message)
      setLikesList(prev => {
        return {...prev, likesYou:responce.data.likesYou}
      })
    })
    .catch(error => {
      console.error("Error: ",error)
    })
    .finally(()=>{
      setLoad(false)
    })
}

function handleCrossClick(target_user_id){
  setLoad(true)
  axios.post('http://127.0.0.1:5000/likeno',{user_id:user_id, target_user_id: target_user_id,swipe_action:'left' })
  .then(responce => {
    console.log(responce.data.message)
    setLikesList(prev => {
      return {...prev, likesYou:responce.data.likesYou}
    })
  })
  .catch(error => {
    console.error("Error: ",error)
  })
  .finally(()=>{
    setLoad(false)
  })

}










  return (
    <Box 
    sx={{
      height: "85vh",
      backgroundColor:'white',
      width: "100%",
      p: 2,
      overflowY: "auto",
      "&::-webkit-scrollbar": { display: "none" },
      msOverflowStyle: "none",
      scrollbarWidth: "none"
      }} 
      >
      <Tabs
        value={value}
        onChange={handleTabChange}
        aria-label="Likes Tabs"
        indicatorColor="transparent"
        sx={{
          width:'100%',
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: "white",  
        }}
      >
        <Tab
          label="Liked By You"
          sx={{
            fontSize: '12px',
            flex: 1,
            textAlign: "center",
            color: value === 0 ? "black !important" : "", 
            borderBottom: value === 0 ? "2px solid black" : "none", 
            transition: "background-color 0.3s ease, color 0.3s ease", 
          }}
        />
        <Tab
          label="Likes You"
          sx={{
            fontSize: '12px',
            flex: 1,
            textAlign: "center",
            color: value === 1 ? "black !important" : "", 
            borderBottom: value === 1 ? "2px solid black" : "none",
            transition: "background-color 0.3s ease, color 0.3s ease", 
          }}
        />
      </Tabs>

      <Box
        sx={{
          height: "75vh",
          backgroundColor: 'white',
          width: "100%",
          overflowY: "auto",
          msOverflowStyle: "none", 
          scrollbarWidth: "none", 
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        { likesList ? (
        <List>
          {filteredList.length > 0 ? (
            filteredList.map((like) => (
              <ListItem
                key={like.user_id}
                sx={{
                  width:'100%',
                  bgcolor: value === 0? '#cce5ff':'#f8d7da',
                  borderRadius:3,
                  mb: 1,
                  
                }}
              >
                <ListItemAvatar>
                  <Avatar alt={like.name} src={like.images[0]} />
                </ListItemAvatar>
                <ListItemText primary={like.name} secondary={like.age + " years old"} />
                {value === 1 && <>
                <IconButton onClick={() => handleLikeClick(like.user_id)}>
                  {load ? <CircularProgress size={5} sx={{ color: 'black' }} />:<FavoriteRoundedIcon sx={{color:'red'}}/>}
                  </IconButton>
                <IconButton onClick={() => handleCrossClick(like.user_id)}>
                {load ? <CircularProgress size={5} sx={{ color: 'black' }} />:<CloseRoundedIcon sx={{color:'black'}}/>}
                  </IconButton></>}
              </ListItem>
            ))
          ) : likesList === null ? (  
            <Typography variant="h5" color="textSecondary" align="center">
              Loading...
            </Typography>
          ) : (
            <Typography variant="h5" color="textSecondary" mt={'30vh'} align="center">
              No likes yet. Keep swiping!
            </Typography>
          )}
        </List>
        ):(
          <CircularProgress size={50} sx={{ color: 'black', marginTop:'50%' }} />
        )}
      </Box>
    </Box>
  );
}
