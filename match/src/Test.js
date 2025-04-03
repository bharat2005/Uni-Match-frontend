import { useState } from "react";
import { Skeleton,Box } from "@mui/material";

const ImageWithSkeleton = ({ src="https://bharatbuckettiny.s3.eu-north-1.amazonaws.com/d98593ac44415fa70d8522ac3fbd42fa.jpg" }) => {
  const [loaded, setLoaded] = useState(true);

  return (
    <div style={{ position: "relative" }}>
      {/* Show Skeleton while loading */}

   
    <Box
      sx={{
        width: "500px",
        height: "500px",
        borderRadius: "0 0 16px 16px",
        position: "relative",
        backgroundColor: "#fce4ec",
        "&::after": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100px",
          height: "100px",
          background:
            "linear-gradient(145deg, #ff4f8b 0%, #ff92c6 30%, #d0b3ff 70%, #98d9ff 100%)",
          opacity: 0.2, // Soft overlay effect
          animation: "shimmer 1.5s infinite",
        },
        "@keyframes shimmer": {
          "0%": { opacity: 0.2 },
          "50%": { opacity: 0.4 },
          "100%": { opacity: 0.2 },
        },
      }}
    />


      {/* Actual Image
<img
  src={src}

  //onLoad={() => setTimeout(()=> setLoaded(true),5000)}
  style={{
    display: loaded ? 'block': 'none', // Blur until loaded
    transition: "filter 0.5s ease-in-out",
    width:'50vw', height:'50vh'

  }}
/> */}
    </div>
  );
};

export default ImageWithSkeleton;
