import React, { useState, useEffect} from "react";
import { Box, Typography, Avatar, List, ListItem, ListItemAvatar,Dialog,DialogTitle,DialogContent,DialogActions,Button, ListItemText, CircularProgress, Tabs, Tab, Badge, IconButton } from "@mui/material";
import Chat from './Chat';
import axios from 'axios';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';


export default function Chats({ profile , setMatchesNoti}) {
  const [value, setValue] = useState(0)
  const [open, setOpen] = useState(false)
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [matchList, setMatchList] = useState(null)
  const [notifications, setNotifications] = useState(null)

  useEffect(() => {
    axios
      .get('https://api.uni-match.in/matches', {withCredentials: true, headers: { "X-CSRF-TOKEN": localStorage.getItem("csrfTokenAccess") }})
      .then(response =>{
        console.log(response.data)
        setMatchList(response.data.matches) 
        setNotifications(response.data.notifications)
      })
      .catch(error => {
        console.error("Error: ", error);

        if (error.response?.status === 401) {

          axios.post("https://api.uni-match.in/refresh", {}, { withCredentials:true, headers: { "X-CSRF-TOKEN": localStorage.getItem("csrfTokenRefresh") }} )

            .then((refreshResponse) => {

                    const csrfToken = refreshResponse.headers["x-csrf-token"]
                    localStorage.setItem("csrfToken", csrfToken)

                axios.get("https://api.uni-match.in/matches", { withCredentials:true,  headers: { "X-CSRF-TOKEN": localStorage.getItem("csrfTokenAccess") } })
                .then((response) => {
                  console.log("Protected Data (After Refresh):", response.data)
                  setMatchList(response.data.matches); 
                  setNotifications(response.data.notifications)
                })
                .catch((retryError) => console.error("Failed after refresh:", retryError));
            })
            .catch(() => console.error("Session expired, please log in again."));
        }
      });
  }, [selectedMatch]);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };


  function handleNotiClick(sender_reg_no){
    axios.patch('https://api.uni-match.in/notidel',{sender_reg_no},{withCredentials: true, headers: { "X-CSRF-TOKEN": localStorage.getItem("csrfToken") }} )
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
    axios.post('https://api.uni-match.in/matchdel',data, {withCredentials: true, headers: { "X-CSRF-TOKEN": localStorage.getItem("csrfToken") }} )
    .then(response => {
      setMatchList(response.data.matches)
      setMatchesNoti(response.data.MatchesNoti)
    })
    .catch(error => {
      console.error('Error :',error)
    })
  }

  function handleClick(sender_reg_no){
    handleNotiClick(sender_reg_no)
    axios.post('https://api.uni-match.in/seen',{ sender_reg_no},{withCredentials: true, headers: { "X-CSRF-TOKEN": localStorage.getItem("csrfToken") }}  )
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
    return <Chat match={selectedMatch} profile={profile} onBack={() => setSelectedMatch(null)} />
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
                  <React.Fragment key={match.reg_no}>
                    <ListItem
                      onClick={() => {setSelectedMatch(match); handleClick(match.reg_no)}}
                      sx={{
                        bgcolor: "#d4edda",
                        borderRadius: "8px",

                      }}
                    >
                      <ListItemAvatar>
                        <Badge badgeContent={notifications.filter((item) => item.sender_reg_no == match.reg_no).length}  color="error">
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
                      <Button sx={{backgroundColor: 'darkgreen !important'}} onClick={(e) => handleDeleteMatch(e,{ user_2_reg_no:match.reg_no})} variant="contained">
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