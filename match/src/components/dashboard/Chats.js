import React, { useState, useEffect} from "react";
import { Box, Typography, Avatar, List, ListItem, ListItemAvatar,Dialog,DialogTitle,DialogContent,DialogActions,Button, ListItemText, CircularProgress, Tabs, Tab, Badge, IconButton } from "@mui/material";
import Chat from './Chat';
import axios from 'axios';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

export default function Chats({ user_id, profile , setMatchesNoti}) {
  const [value, setValue] = useState(0)
  const [open, setOpen] = useState(false)
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [matchList, setMatchList] = useState(null)
  const [notifications, setNotifications] = useState(null)

  useEffect(() => {
    axios
      .post('http://127.0.0.1:5000/matches',{user_id}, { withCredentials: true })
      .then(response => {
        console.log(response.data.matches)
        setMatchList(response.data.matches); 
        setNotifications(response.data.notifications)
      })
      .catch(error => {
        console.error("Error: ", error);
      });
  }, [selectedMatch]);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };


  function handleNotiClick(sender_user_id){
    axios.patch('http://127.0.0.1:5000/notidel',{sender_user_id, user_id})
    .then(response => {
      console.log(response.data)
      setMatchesNoti(response.data.MatchesNoti)
    })
    .catch(error => {
      console.error("Error: ",error)
    })
  }

  function handleDeleteMatch(e,data){
    e.stopPropagation();
    axios.post('http://127.0.0.1:5000/matchdel',data)
    .then(response => {
      setMatchList(response.data.matches)
      setMatchesNoti(response.data.MatchesNoti)
    })
    .catch(error => {
      console.error('Error :',error)
    })
  }

  function handleClick(sender_id){
    handleNotiClick(sender_id)
    axios.post('http://127.0.0.1:5000/seen',{ user_id , sender_id})
    .then(responce => {
      console.log(responce.data.message)
    })
    .catch(error =>{
      console.error("Error: ", error)
    })
  }

  let filteredList;
  if (matchList){
    filteredList = matchList
  }
  
  if (selectedMatch){
    return <Chat match={selectedMatch} user_id={user_id} profile={profile} onBack={() => setSelectedMatch(null)} />
  }


  return (
    <>

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
          label="Chats"
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
          label="Coming Soon!"
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

{value === 0 &&
<>
      
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
         { matchList ? (
          <List>
            {filteredList.length > 0 ? (
              filteredList.map((match, index) => {

                return (
                  <React.Fragment key={match.user_id}>
                    <ListItem
                      onClick={() => {setSelectedMatch(match); handleClick(match.user_id)}}
                      sx={{
                        bgcolor: "#d4edda",
                        borderRadius: "8px",

                      }}
                    >
                      <ListItemAvatar>
                        <Badge badgeContent={notifications.filter((item) => item.sender_user_id == match.user_id).length}  color="error">
                        <Avatar alt={match.name} src={match.images[0]} />
                        </Badge>
                      </ListItemAvatar>
                      <ListItemText primary={match.name} secondary={match.age + " years old"}/>
                      
                      <IconButton onClick={(e)=> {e.stopPropagation();setOpen(true)}} >
                        <CloseRoundedIcon sx={{color:'black'}}/>
                      </IconButton>


                      <Dialog open={open} onClose={(e)=>{e.stopPropagation();setOpen(false)}}>
                        <DialogTitle>Confirm Delete Match</DialogTitle>
                      <DialogContent>
                      <Typography variant="body1">
                       Are you sure you want to delete your Match?
                      </Typography>
                      </DialogContent>
                      <DialogActions>
                      <Button onClick={(e)=>{e.stopPropagation();setOpen(false)}} sx={{color:'black'}}>
                      Cancel
                      </Button>
                      <Button sx={{backgroundColor: 'darkgreen !important'}} onClick={(e) => handleDeleteMatch(e,{user_1_id:user_id, user_2_id:match.user_id})} variant="contained">
                      Delete
                      </Button>
                      </DialogActions>
                      </Dialog>



                    </ListItem>
                  </React.Fragment>
                );
              })
            ) : (
              <Typography variant="h5" color="textSecondary" align="center" mt={'30vh'}>
                No matches. Keep swiping!
              </Typography>
            )}
          </List>
         ):(
          <CircularProgress size={50} sx={{ color: '#fd7e14', marginTop:'50%' }} />
         )}
      </Box>

      </>}
      {value == 1 &&
        <Typography variant="h3" color="textPrimary" align="center" mt={'30vh'}>
        Coming Soon!
      </Typography>
      }
      </Box>
    </>
  );
}