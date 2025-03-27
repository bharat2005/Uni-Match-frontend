import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Skeleton,
} from "@mui/material";

const ProfileGridSkeleton = () => {
  return (
    <Box
      sx={{
        background:
          "linear-gradient(180deg, rgba(245, 245, 245, 0) 0%, #F5F5F5 26%)",
        minHeight: "100vh",
        padding: { xs: "12px", sm: "14px", md: "18px" },
      }}
    >
      <Box sx={{ marginBottom: "16px" }}>
        <Typography
          sx={{
            textAlign: "left",
            fontSize: { xs: "24px", sm: "28px" },
            fontWeight: 600,
            color: "#333",
            letterSpacing: "0.5px",
          }}
        >
          Likes
        </Typography>
      </Box>

      <Grid container spacing={{ xs: 1, sm: 2 }} columns={{ xs: 2, sm: 2 }}>
        {[...Array(6)].map((_, index) => (
          <Grid item xs={1} key={index}>
            <Card
              sx={{
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
                boxShadow: "none",
                background: "transparent",
                height: "100%",
                position: "relative",
                textAlign: "left",
              }}
            >
              <Skeleton
                variant="rectangular"
                width="100%"
                height={200}
                sx={{ borderRadius: "26px" }}
              />
              <CardContent
                sx={{
                  paddingBottom: "12px !important",
                  paddingTop: "6px !important",
                }}
              >
                <Skeleton width="60%" height={30} />
                <Skeleton width="40%" height={20} />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ProfileGridSkeleton;
