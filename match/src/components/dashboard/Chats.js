import React, { useState, useEffect} from "react";
import { Box, Typography, Avatar, List, ListItem, ListItemAvatar, ListItemText, CircularProgress } from "@mui/material";
import Chat from './Chat';
import axios from 'axios';

export default function Likes({ user_id, profile }) {
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [matchList, setMatchList] = useState(null)

  useEffect(() => {
    axios
      .post('http://127.0.0.1:5000/matches', { user_id })
      .then(response => {
        console.log(response.data.matches)
        setMatchList(response.data.matches); 
      })
      .catch(error => {
        console.error("Error: ", error);
      });
  }, []);


  let filteredList;
  if (matchList){
    filteredList = matchList
  }
  


  return (
    <>
      {selectedMatch ? (
        <Chat match={selectedMatch} user_id={user_id} profile={profile} onBack={() => setSelectedMatch(null)} />
      ) : (
        <Box
          sx={{
            height: "85vh",
            backgroundColor:'#ffbf00',
            width: "500px",
            p: 2,
            pt:0,
            pb:0,
            overflowY: "auto",
            "&::-webkit-scrollbar": { display: "none" },
            msOverflowStyle: "none",
            scrollbarWidth: "none",
          }}
        >
         { matchList ? (
          <List>
            {filteredList.length > 0 ? (
              filteredList.map((match, index) => {

                return (
                  <React.Fragment key={match.user_id}>
                    <ListItem
                      onClick={() => setSelectedMatch(match)}
                      sx={{
                        bgcolor: "#d4edda",
                        borderRadius: "8px",
                        mb: 1,
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar alt={match.name} src={match.images[0]} />
                      </ListItemAvatar>
                      <ListItemText primary={match.name} secondary={match.age + " years old"} />
                    </ListItem>
                  </React.Fragment>
                );
              })
            ) : (
              <Typography variant="h5" color="textSecondary" align="center" mt={'38vh'}>
                No matches yet. Keep swiping!
              </Typography>
            )}
          </List>
         ):(
          <CircularProgress size={50} sx={{ color: 'black' }} />
         )}
        </Box>
      )}
    </>
  );
}