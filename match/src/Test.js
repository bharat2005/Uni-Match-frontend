import { useState } from "react";
import { Skeleton } from "@mui/material";

const ImageWithSkeleton = ({ src="https://bharatbuckettiny.s3.eu-north-1.amazonaws.com/d98593ac44415fa70d8522ac3fbd42fa.jpg" }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div style={{ position: "relative" }}>
      {/* Show Skeleton while loading */}


      {/* Actual Image */}
<img
  src={src}

  onLoad={() => setTimeout(()=> setLoaded(true),5000)}
  style={{
    filter: loaded ? "none" : "blur(10px)", // Blur until loaded
    transition: "filter 0.5s ease-in-out",
    width:'50vw', height:'50vh'

  }}
/>
    </div>
  );
};

export default ImageWithSkeleton;
