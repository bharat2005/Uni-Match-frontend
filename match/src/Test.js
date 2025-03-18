import Lottie from "lottie-react";
import heartAnimation from "./heart.json"; // Downloaded JSON file

function BeatingHeart() {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <Lottie 
        animationData={heartAnimation} 
        loop={true} 
        style={{ width: 150, height: 150 }} 
      />
    </div>
  );
}

export default BeatingHeart;
