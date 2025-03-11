"use client";
import * as React from "react";
import { Box, Button, Typography, Container } from "@mui/material";
import { ChevronLeft } from "@mui/icons-material";



const interests = [
  { emoji: "🎬", label: "Movies" },
  { emoji: "🎶", label: "Music" },
  { emoji: "🏋️‍♂️", label: "Sports" },
  { emoji: "🎮", label: "Gaming" },
  { emoji: "✈️", label: "Travel" },
  { emoji: "🍽️", label: "Cooking" },
  { emoji: "🎨", label: "Art" },
  { emoji: "📖", label: "Reading" },
  { emoji: "🥾", label: "Hiking" },
  { emoji: "🖌️", label: "Painting" },
  { emoji: "🧘‍♀️", label: "Yoga" },
  { emoji: "⛺", label: "Camping" },
  { emoji: "🎣", label: "Fishing" },
  { emoji: "💃", label: "Dancing" },
  { emoji: "🏃‍♀️", label: "Running" },
  { emoji: "🚴‍♂️", label: "Cycling" },
  { emoji: "✍️", label: "Writing" },
  { emoji: "🎧", label: "Podcasts" },
  { emoji: "🛍️", label: "Shopping" },
  { emoji: "🏊‍♂️", label: "Swimming" },
  { emoji: "🎲", label: "Boardgames" },
  { emoji: "🕹️", label: "Arcade" },
  { emoji: "💄", label: "Makeup" },
  { emoji: "🌱", label: "Gardening" },
  { emoji: "🏃‍♂️", label: "Fitness" },
  { emoji: "🍰", label: "Baking" },
  { emoji: "🎿", label: "Skiing" },
  { emoji: "🍷", label: "Tasting" },
  { emoji: "🚗", label: "Roadtrip" },
  { emoji: "🐾", label: "Pets" },
  { emoji: "👗", label: "Fashion" },
  { emoji: "💻", label: "Coding" },
  { emoji: "📷", label: "Photography" },
  { emoji: "📺", label: "Streaming" },
  { emoji: "🚢", label: "Cruising" },
  { emoji: "🏕️", label: "Adventure" },
  { emoji: "🛩️", label: "Skydiving" },
  { emoji: "🏎️", label: "Racing" },
  { emoji: "🎭", label: "Acting" },
  { emoji: "🧩", label: "Puzzles" },
  { emoji: "🔭", label: "Astronomy" },
  { emoji: "🎤", label: "Singing" },
  { emoji: "🤹", label: "Juggling" },
  { emoji: "🪂", label: "Paragliding" },
  { emoji: "📡", label: "Tech" },
  { emoji: "🧪", label: "Science" }
];





function LocationSelector({setStep, formData, setFormData}) {

  const handleLocationSelect = (location) => {
    setFormData((prev) => {
      return {...prev, interests: prev['interests'].includes(location) ? prev['interests'].filter((loc) => loc !== location) :  [...prev['interests'], location]}})}

  return (
  <>


      <Box
        maxWidth="md"
        sx={{
          marginTop: "20%",
          padding: "20px",
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: 24,
            fontWeight: 500,
            textAlign: "center",
          }}
        >
          Choose your interests
        </Typography>

        <Typography
          sx={{
            fontSize: 14,
            color: "#666",
            textAlign: "center",

          }}
        >
         Let us know what you like
        </Typography>

     
        <Box
          sx={{
            display: "grid",
            margin: "30px 0 50px 0",
            gridTemplateColumns: {
              xs: "repeat(1, 1fr)",
              sm: "repeat(1, 1fr)",
            },
            gap: { xs: "10px", sm: "15px" },
            padding: "0 25%",
            maxHeight: "calc(78vh - 228px)",
            overflowY: "auto",
            msOverflowStyle: "none",
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          {interests.map((location) => (
            <Button
              key={location.label}
              onClick={() => handleLocationSelect(location.label)}
              sx={{
                background: formData['interests'].includes(location.label)
                  ? "rgba(255, 105, 190, 0.4)"
                  : "white",
                borderRadius: "25px",
                padding: { xs: "10px", sm: "12px" },
                textAlign: "center",
                fontSize: { xs: "14px", sm: "16px" },
                color: formData['interests'].includes(location.label) ? "white" : "black",
                transition: "all 0.3s ease",
                "&:hover": {
                  background: formData['interests'].includes(location.label)
                    ? "rgba(255, 105, 190, 0.4)"
                    : "white",
                },
                fontFamily: "inherit",
                boxShadow: formData['interests'].includes(location.label)
                  ? "0 2px 6px rgba(255, 70, 162, 0.3)"
                  : "none",
                transform: formData['interests'].includes(location.label)
                  ? "scale(1.02)"
                  : "scale(1)",
              }}
            >
              {location.emoji}{location.label}
            </Button>
          ))}
        </Box>
      

                    
                  
                  <Box sx={{display:'flex', justifyContent:'center', paddingTop:'0px'}}>
                            <Button disabled={!formData['interests'].length} onClick={()=> setStep(7)} sx={{
                        color: "white !important",
                        padding: "12px 0",
                        width: "80%",
                        maxWidth: "300px",
                        borderRadius: "25px",
                        fontSize: { xs: "14px", sm: "16px" },
                        textTransform: "none",
                        backgroundColor: formData['interests'].length? "#ff69b4" : "#fed8e6",
                        "&:hover": {
                          backgroundColor: formData['interests'].length? "#ff69b4" : "#fed8e6",
                        },
                      }}>Next Step</Button>
                      </Box>

      
      </Box>

     </>
  );
}

export default LocationSelector;
