import React, { useEffect, useState } from "react";
import "../../App.css";
import { Box, Typography, IconButton } from "@mui/material";
import { createPortal } from "react-dom";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import Drawer from "./Drawer";
import SmallLoading from "../login/SmallLoading";
import ImagePart from "./ImagePart.js";
import { useOutletContext } from "react-router-dom";

export default function Info() {
  const {
    profile,
    currentImageIndex,
    prevImage,
    nextImage,
    imageLoaded,
    setImageLoaded,
    list,
    imageClick,
    setImageClick,
  } = useOutletContext();

  return (
    <>
      createPortal(
      <ImagePart
        imageLoaded={imageLoaded}
        setImageLoaded={setImageLoaded}
        list={list}
        currentImageIndex={currentImageIndex}
        setImageClick={setImageClick}
        prevImage={prevImage}
        nextImage={nextImage}
      />
      , document.body, )
      <Drawer imageClick={imageClick} profile={profile} key={profile.reg_no} />
    </>
  );
}
