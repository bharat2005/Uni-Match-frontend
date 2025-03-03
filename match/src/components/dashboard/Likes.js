import React, { useState, useEffect } from "react";
import { Box, Typography, Avatar, Modal, List, ListItem, ListItemAvatar, ListItemText, Tabs, Tab, CircularProgress, IconButton } from "@mui/material";
import axios from 'axios';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";



export default function Likes({setLikesNoti}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [likesList, setLikesList] = useState(null); 
  const [value, setValue] = useState(0);  
  const [load, setLoad] = useState(false)
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState({})


  useEffect(() => {
    axios
      .get('https://api.uni-match.in/likes',{withCredentials: true, headers: { "X-CSRF-TOKEN": localStorage.getItem("csrfToken") }})
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
  filteredList = value === 1 ? likesList.likedByYou : likesList.likesYou
}

function handleNotiClick(target_reg_no){
  axios.patch('https://api.uni-match.in/notidel',{target_reg_no}, {withCredentials: true, headers: { "X-CSRF-TOKEN": localStorage.getItem("csrfToken") }})
  .then(response => {
    console.log(response.data)
    setLikesNoti(response.data.likesNoti)
  })
  .catch(error => {
    console.error("Error: ",error)
  })
}


function handleLikeClick(target_reg_no){
  setLoad(true)
  handleNotiClick(target_reg_no)
    axios.post('https://api.uni-match.in/match',{target_reg_no,swipe_action:'right' }, {withCredentials: true, headers: { "X-CSRF-TOKEN": localStorage.getItem("csrfToken") }})
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

function handleCrossClick(target_reg_no){
  setLoad(true)
  handleNotiClick(target_reg_no)
  axios.post('https://api.uni-match.in/likeno',{ target_reg_no,swipe_action:'left' }, {withCredentials: true, headers: { "X-CSRF-TOKEN": localStorage.getItem("csrfToken") }})
  .then(responce => {
    console.log(responce.data.message)
    setLikesList(prev => {
      return {...prev, likesYou:responce.data.likesYou}
    })
  })
  .catch(error => {
    console.error("Error: ",error)
    if (error.response?.status === 401) {

      axios.post("/refresh", {}, { withCredentials:true, headers: { "X-CSRF-TOKEN": localStorage.getItem("csrfToken") } })

        .then((refreshResponse) => {

            const csrfToken = refreshResponse.headers["x-csrf-token"]
            localStorage.setItem("csrfToken", csrfToken)

            axios.post("https://api.uni-match.in/likeno", { target_reg_no,swipe_action:'left' }, { withCredentials:true,  headers: { "X-CSRF-TOKEN": localStorage.getItem("csrfToken") } })
            .then((response) => {
              console.log("Protected Data (After Refresh):", response.data)
              setLikesList(prev => {
                return {...prev, likesYou:response.data.likesYou}
              })
            })
            .catch((retryError) => console.error("Failed after refresh:", retryError));
        })
        .catch(() => console.error("Session expired, please log in again."));
    }
  })
  .finally(()=>{
    setLoad(false)
  })

}


function emoji(){
  switch (selected.reason){
    case "Casual Dating":
      return "🎉"
    case "Short-term fun":
      return "😍"
    case "Long-term relationship":
      return "💘"
    case "New friends":
      return "👋"
    case "Study buddy":
      return "📚"
    case "Still figuring it out":
      return "🤔"
  }}

  let list = []
  if (selected.images){
  list = selected.images.filter(item => item!=null)}
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === list.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? list.length - 1 : prevIndex - 1
    );
  };


  return (
<>
    <Modal open={open} onClose={()=>setOpen(false)}>
  <Box
       sx={{
          position: "relative",
          backgroundColor: "white",
          border:'2px solid black',
          width: "280px",
          height: "400px",
          boxShadow: "inset 0px -20px 40px 0px black",
          borderRadius: "8px",
          top: "45%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundImage: `url(${list[currentImageIndex]})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
       }}
     >
       
       <IconButton
         sx={{ position: "absolute", left: "10px", color: "white" }}
         onPointerDown={prevImage}
       >
         <ArrowBackIos />
       </IconButton>
 
 
       <IconButton
         sx={{ position: "absolute", right: "10px", color: "white" }}
         onPointerDown={nextImage}
       >
         <ArrowForwardIos />
       </IconButton>

       <Typography
         variant="h6"
         sx={{
           position: "absolute",
           bottom: "35px",
           left: "15px",
           fontWeight: "bold",
           fontSize: "25px",
           color: "white",
         }}
       >
         {selected.name}, {selected.age}
       </Typography>
       <Typography
         variant="body1"
         sx={{
           position: "absolute",
           bottom: "15px",
           left: "12px",
           fontSize: "15px",
           color: "white",
         }}
       >
         {emoji()}{selected.reason}
       </Typography>
     </Box>
  </Modal>








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
          label="Likes You"
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
          label="Liked By You"
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
                  bgcolor: value === 1? '#cce5ff':'#f8d7da',
                  borderRadius:3,
                  mb: 1,
                  
                }}
              >
                <ListItemAvatar>
                  <Avatar alt={like.name} src={like.images[0]} onClick={()=> {setSelected(like);setOpen(true)}}/>
                </ListItemAvatar>
                <ListItemText primary={like.name} secondary={like.age + " years old"} />
                {value === 0 && <>
                <IconButton onClick={() => handleLikeClick(like.user_id)}>
                  <FavoriteRoundedIcon sx={{color:'red'}}/>
                  </IconButton>
                <IconButton onClick={() => handleCrossClick(like.user_id)}>
                <CloseRoundedIcon sx={{color:'black'}}/>
                  </IconButton></>}
              </ListItem>
            ))
          ) : likesList === null ? (  
            <Typography variant="h5" color="textSecondary" align="center">
              Loading...
            </Typography>
          ) : (
            <Typography variant="h5" color="textSecondary" mt={'30vh'} align="center">
              No likes. Keep swiping!
            </Typography>
          )}
        </List>
        ):(
          <CircularProgress size={50} sx={{ color: '#fd7e14', marginTop:'50%' }} />
        )}
      </Box>
    </Box>
    </>
  );
}
