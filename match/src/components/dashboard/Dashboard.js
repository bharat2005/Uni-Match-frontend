import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import Match from './Match';
import Navbar from './NavBar';
import Profile from './Profile';
import Likes from './Likes';
import Chats from './Chats';
import axios from 'axios';


let list =[
  {name:'Kaori', id: 0, age:'19', image:'/pic/1.jpeg',type:'likedByYou'},
  {name:'Misaki', id: 1, age:'18', image:'/pic/2.jpeg',type:'likesYou'},
  {name:'Yuki', id:2, age:'19', image:'/pic/3.jpeg', type:'mutual'}
]



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
        return <Match profiles={profiles}/>;
      case 1:
        return <Likes list={list.filter((item)=>item.type=="likedByYou" || item.type == "likesYou")}/>;
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
