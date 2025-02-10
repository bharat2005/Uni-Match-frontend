import React, { useState } from "react";
import { Box, Typography, Avatar, List, ListItem, ListItemAvatar, ListItemText, Divider } from "@mui/material";
import Chat from './Chat';

export default function Likes({ list }) {
  const [selectedMatch, setSelectedMatch] = useState(null);

  return (
    <>
      {/* If a match is selected, show Chat component */}
      {selectedMatch ? (
        <Chat match={selectedMatch} onBack={() => setSelectedMatch(null)} />
      ) : (
        <Box
          sx={{
            height: "95%",
            bgcolor: "background.paper",
            boxShadow: 2,
            width: "500px",
            p: 2,
            overflowY: "auto",
            "&::-webkit-scrollbar": { display: "none" },
            msOverflowStyle: "none",
            scrollbarWidth: "none",
          }}
        >
          <Box display="flex" justifyContent="center" gap={12} mb={0.3} mt={1}>
            <Typography sx={{ fontSize: "25px" }}>
              <b>Chats</b>
            </Typography>
          </Box>

          <List>
            {list.length > 0 ? (
              list.map((match, index) => {
                let bgColor = "white";
                if (match.type === "mutual") bgColor = "#d4edda";
                else if (match.type === "likedByYou") bgColor = "#cce5ff";
                else if (match.type === "likesYou") bgColor = "#f8d7da";

                return (
                  <React.Fragment key={match.id}>
                    <ListItem
                      onClick={() => setSelectedMatch(match)} // Pass clicked match details
                      sx={{
                        bgcolor: bgColor,
                        borderRadius: "8px",
                        mb: 1,
                        cursor: "pointer",
                        "&:hover": { bgcolor: bgColor },
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar alt={match.name} src={match.image} />
                      </ListItemAvatar>
                      <ListItemText primary={match.name} secondary={match.age + " years old"} />
                    </ListItem>
                    {index < list.length - 1 && <Divider variant="inset" component="li" />}
                  </React.Fragment>
                );
              })
            ) : (
              <Typography variant="body2" color="textSecondary" align="center">
                No matches yet. Keep swiping!
              </Typography>
            )}
          </List>
        </Box>
      )}
    </>
  );
}
