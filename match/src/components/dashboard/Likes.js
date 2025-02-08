import React from "react";
import { Box, Typography, Avatar, List, ListItem, ListItemAvatar, ListItemText, Divider } from "@mui/material";


let list =[
  {name:'Sammy', id: 0, age:'19', image:'/me.jpg',type:'mutual'},
  {name:'Mandy', id: 1, age:'18', image:'/me2.jpg',type:'likedByYou'},
  {name:'Linda', id: 2, age:'20', image:'/me3.jpg',type:'likesYou'},
  {name:'Linda', id: 2, age:'20', image:'/me3.jpg',type:'mutual'},
  {name:'Linda', id: 2, age:'20', image:'/me3.jpg',type:'likedByYou'},
  {name:'Linda', id: 2, age:'20', image:'/me3.jpg',type:'likedByYou'},
  {name:'Linda', id: 2, age:'20', image:'/me3.jpg',type:'likedByYou'},
  {name:'Linda', id: 2, age:'20', image:'/me3.jpg',type:'likedByYou'},
  {name:'Linda', id: 2, age:'20', image:'/me3.jpg',type:'likedByYou'},
  {name:'Linda', id: 2, age:'20', image:'/me3.jpg',type:'mutual'},
  {name:'Linda', id: 2, age:'20', image:'/me3.jpg',type:'likedByYou'},
  {name:'Linda', id: 2, age:'20', image:'/me3.jpg',type:'likedByYou'}
]


export default function Likes({  onChatOpen }) {
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
        {list.length > 0 ? (
          list.map((match, index) => {
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
  );
}
