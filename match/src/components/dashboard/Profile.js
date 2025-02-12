import React from "react";
import { Card, CardContent, Avatar, Typography, Box, Button, Stack } from "@mui/material";

export default function Profile({ profile}){
  return (
    <Card
      sx={{
        width:'100%',
        mx: "auto",
        textAlign: "center",
        backgroundColor:'#ffbf00',
        boxShadow: 'none',
        p: 2,
      }}
    >
      <Box display="flex" justifyContent="center" mt={2}>
        <Avatar
          alt={profile.name}
          src={profile.images[0]}
          sx={{ width: 100, height: 100, border: "3px solid black" }}
        />
      </Box>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {profile.name}, {profile.user_id}
        </Typography>
        <Stack direction="column" spacing={5} mt={2}>
          <Button variant="contained" color="primary" size="small">
            Edit Profile
          </Button>
          <Button variant="outlined" color="error" size="small">
            Logout
          </Button>
          <Button variant="text" color="secondary" size="small">
            About Us
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};

