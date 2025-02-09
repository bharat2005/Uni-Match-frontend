import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import Match from './Match';
import Navbar from './NavBar';
import Profile from './Profile';
import Likes from './Likes';
import Chats from './Chats';
import axios from 'axios';


let list =[
  {name:'Sammy', id: 0, age:'19', image:'/me.jpg',type:'likedByYou'},
  {name:'Mandy', id: 1, age:'18', image:'/me2.jpg',type:'likesYou'},
  {name:'Linda', id: 2, age:'20', image:'/me3.jpg',type:'mutual'},

]

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
      [array[i], array[j]] = [array[j], array[i]]; // swap elements
  }
  return array;
}



export default function Dashboard(){
  const [value, setValue] = useState(0);
  const [profiles,setProfiles] = useState([])

  useEffect(()=>{
    axios.get('http://127.0.0.1:5000/dashboard')
    .then(responce => {
      console.log("Message from server: ", responce.data)
      setProfiles(responce.data)
    })
    .catch(error => {
      console.error("Error", error)
    })
  },[])


  function renderCompo(){
    switch (value) {
      case 0:
        return <Match profiles={shuffleArray(profiles)}/>;
      case 1:
        return <Likes list={list.filter((item)=>item.type=="likedByYou" || item.type == "likesYou")} onChatOpen={()=>true}/>;
      case 2:
        return <Chats list={list.filter((item)=> item.type=="mutual")} onChatOpen={()=>true}/>;
      case 3:
        return <Profile />;
      default:
        return <Match/>;
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: 'space-between',
        backgroundColor: "#ffbf00",
        
      }}
    >
      <Box
        sx={{
          display:'flex',
          justifyContent:'center',
          width: "100%",
          height: "90%",
          position: "relative",
        }}
      >
        {renderCompo()}
      </Box>

      <Navbar value={value} onChange={(event, newValue) => setValue(newValue)} />
    </Box>
  );
};
