"use client";
import * as React from "react";

function HeartAnimation({app}) {
  const containerStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: app ? "calc(100vh - 52px)" : "100vh",
    backgroundColor: app ? "transparent" : "rgba(255, 255, 255, 0.4)", 
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  
  };

  const heartFigureStyle = {
    position: "relative",
    width: "60px",
    height: "60px",
    margin: 0,
  };

  const heartSvgStyle = {
    position: "relative",
    width: "100%",
    height: "100%",
  };

  return (
    <section style={containerStyle}>
      <figure style={heartFigureStyle}>
        <svg viewBox="0 0 100 100" style={heartSvgStyle}>
          <defs>
            <linearGradient
              id="heart-gradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#ff69b4" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>
          <path
            d="M50 85C20 65 8 55 8 38C8 15 35 10 50 30C65 10 92 15 92 38C92 55 80 65 50 85Z"
            fill="none"
            stroke="#F5E5FF"
            strokeWidth="7"
          />
          <path
            d="M50 85C20 65 8 55 8 38C8 15 35 10 50 30C65 10 92 15 92 38C92 55 80 65 50 85Z"
            fill="none"
            stroke="url(#heart-gradient)"
            strokeWidth="7"
            strokeLinecap="round"
          >
<animate
  attributeName="stroke-dasharray"
  values="300, 200"
  dur="1.6s"
  repeatCount="indefinite"
/>
<animate
  attributeName="stroke-dashoffset"
  from="0"
  to="-500"
  dur="1.6s"
  repeatCount="indefinite"
  calcMode="linear"
/>

          </path>
        </svg>
      </figure>
    </section>
  );
}

export default HeartAnimation;
