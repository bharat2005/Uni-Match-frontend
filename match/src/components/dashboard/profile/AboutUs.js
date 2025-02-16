import React from "react";
import { Card, CardContent, Typography, Box, Button } from "@mui/material";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";

const AboutUs = ({setBool}) => {
  const handleContactClick = () => {
    window.location.href = "mailto:bharatvdeshm2005@gmail.com";
  };


  return (
    <Card
      sx={{
        maxWidth: 600,
        margin: "0px auto",
        padding: 0,
        boxShadow:'none',
        backgroundColor: "#f9f9f9",
        height: "80vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          padding: "16px",
          borderBottom: "1px solid #e0e0e0",
        }}
      >
        <ChevronLeftIcon
          style={{ width: "24px", height: "24px", cursor: "pointer" }}
          onClick={()=>setBool(0)}
        />
        <Typography variant="h6" sx={{ fontWeight: "bold", marginLeft: "16px" }}>
          About Developer
        </Typography>
      </Box>
      <CardContent
        sx={{
          overflowY: "auto",
          padding: 3,
          flexGrow: 1,
          "&::-webkit-scrollbar": { display: "none" }, 
        }}
      >
        <Box mb={3}>
          <Typography variant="body1" paragraph>
            Hi there! I’m <strong>Bharat Deshmukh</strong>, a student of{" "}
            <strong>Lovely Professional University</strong>, and I’m excited to introduce you to{" "}
            <strong>Uni-Match</strong> a dating web app made exclusively for our LPU community. 🎉
          </Typography>
          <Typography variant="body1" paragraph>
            Being a student myself, I’ve always felt there’s something special about the connections we build during our college years. That’s what inspired me to create this web app a platform where you can meet, connect, and build meaningful relationships with fellow students, all within the comfort of our campus community.
          </Typography>
        </Box>

        <Box mb={3}>
          <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
            Why I Built This App
          </Typography>
          <Typography variant="body1" paragraph>
            College life can get busy, and meeting new people outside of our usual friend circles isn’t always easy. I wanted to solve that by creating a space where everyone feels welcome to make new connections, whether you’re looking for love, friendship, or just someone to hang out with.
          </Typography>
        </Box>

        <Box mb={3}>
          <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
            Support Us
          </Typography>
          <Typography variant="body1" paragraph>
            As a student developer, building and maintaining this app has been an exciting but challenging journey. If you like what I’ve built and want to support me, consider donating. Your support will help me keep the app running smoothly and bring you cool new features in the future! 🙌
          </Typography>
        </Box>

        <Box textAlign="center">
          <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
            Let’s Connect
          </Typography>
          <Typography variant="body1" paragraph>
            Got feedback or ideas to make this app even better? I’d love to hear from you! Drop me a message at{" "}
            <strong>bharatvdeshm2005@gmail.com</strong>, or let me know through the app.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleContactClick}
            sx={{ mt: 2 }}
          >
            Contact Me
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default AboutUs;
