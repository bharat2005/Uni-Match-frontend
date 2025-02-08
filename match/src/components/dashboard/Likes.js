import React from "react";
import { Box, Typography, Avatar, List, ListItem, ListItemAvatar, ListItemText, Divider } from "@mui/material";

export default function Likes({ matches, onChatOpen }) {
  return (
    <Box
      sx={{
        height: "95%",
        bgcolor: "background.paper",
        boxShadow: 2,
        width:'500px',
        p: 2,
       // maxHeight: 400,
        overflowY: "auto",
        "&::-webkit-scrollbar": {
          display: "none", // Hide scrollbar for Webkit browsers
        },
        msOverflowStyle: "none", // Hide scrollbar for IE and Edge
        scrollbarWidth: "none", // Hide scrollbar for Firefox
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
        Likes
      </Typography>
      <List>
        {matches.length > 0 ? (
          matches.map((match, index) => {
            let bgColor = "white";
            if (match.type === "mutual") bgColor = "#d4edda"; // Green for mutual matches
            else if (match.type === "likedByYou") bgColor = "#cce5ff"; // Blue for liked by user
            else if (match.type === "likesYou") bgColor = "#f8d7da"; // Red for incoming likes

            return (
              <React.Fragment key={match.id}>
                <ListItem
                  onClick={() => onChatOpen(match)}
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
                {index < matches.length - 1 && <Divider variant="inset" component="li" />}
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
  );
}
