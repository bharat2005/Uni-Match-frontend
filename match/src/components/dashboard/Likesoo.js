import React, { useEffect , useState} from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Modal
} from "@mui/material";
import Modall from './Modal';
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import Drawer from './Drawer';
import SmallLoading from '../login/SmallLoading';

const profile =   { reg_no: '12413928', reason: 'Long-term relationship', age: 23, name: 'Bharat',personality:'extrovert', images: [null, '/10.avif', '/4.avif', '/5.jpg', null], bio:'Im the solo developer of this whole Uni-Match platform...😎', interests:["Gardening", "Paragliding","Puzzles", "Astronomy", "Juggling",   "Art"  ] };

const ProfileGrid = () => {
  const [modalOpen, setModalOpen] = useState(false)
    const [imageClick, setImageClick] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [imageLoaded, setImageLoaded] = useState(false);
    const list = profile.images.filter(item => item != null);
  useEffect(() => {
    // Disable scrolling for the whole page
    document.body.style.overflow = "hidden";
    
    // Cleanup when component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);



  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === list.length - 1 ? 0 : prevIndex + 1
    );

    setImageLoaded(false);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? list.length - 1 : prevIndex - 1
    );
    setImageLoaded(false);
  };


  const profiles = [
    {
      name: "Rakesh, 23",
      details: "💘Long-term ",
      imageUrl: "/9.jpg",
      imageAlt: "Profile photo",
    },
    {
      name: "Amit, 18",
      details: "💘Long-term ",
      imageUrl: "/6.avif",
      imageAlt: "Profile photo",
    },
    {
      name: "Bharat, 19",
      details: "🎉Casual Dating",
      imageUrl: "/5.jpg",
      imageAlt: "Profile photo",
    },
    {
      name: "Tanmay, 22",
      details: "93年 · ",
      imageUrl: "/11.jpg",
      imageAlt: "Profile photo",
    },
    {
      name: "Rahul, 20",
      details: "😍Short-term",
      imageUrl: "/7.avif",
      imageAlt: "Profile photo",
    },

    {
      name: "Deepak, 23",
      details: "🎉Casual Dating",
      imageUrl: "/8.webp",
      imageAlt: "Profile photo",
    },

    {
      name: "Nikhil, 19",
      details: "😍Short-term",
      imageUrl: "/10.avif",
      imageAlt: "Profile photo",
    },
,
  ];

  const containerStyle = {
    background: "transparent",
    minHeight: "100vh",
    padding: "20px",
    "@media (max-width: 991px)": {
      padding: "15px",
    },
    "@media (max-width: 640px)": {
      padding: "10px",
    },
  };

  const scrollableGridStyle = {
    maxHeight: "75vh",
    overflowY: "auto",
    "&::-webkit-scrollbar": {
      display: "none", 
    },
  };

  const cardStyle = {
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    boxShadow: "none",
    background:'transparent',
    height: "100%",
    textAlign:'left',
  };

  const imageStyle = {
    width: "100%",
    height: "200px",
    borderRadius: "26px",
    objectFit: "cover",
  };

  const nameStyle = {
    fontFamily: '"Inter", sans-serif',
    fontSize: {
      xs: "20px",
      sm: "26px",
    },
    fontWeight: 600,
    color: "#333",
    marginBottom: "0px",
  };

  const detailsStyle = {
    fontFamily: '"Inter", sans-serif',
    fontSize: {
      xs: "12px",
      sm: "14px",
    },
    color: "#666",
    lineHeight: 1.4,
  };

  return (<>



<Modall setModalOpen={setModalOpen} modalOpen={modalOpen} name={"unlike"}/>


   <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            //marginBottom:'5%',
            padding: { xs: "16px", sm: "20px" },
            color: "#000",
            fontSize:'38px',
            fontWeight:700,
          }}
        >

       Likes
        </Box>





  {imageClick &&
          <Box
            sx={{
              position: 'fixed',
              top: 0,
              left: '50%',
              transform: imageLoaded
                ? 'translate(-50%, 0) scale(1)'
                : 'translate(-50%, 100%) scale(0.9)',
              width: '100vw',
              height: '60vh',
              zIndex: 5,
              background: imageLoaded 
              ? `url(${list[currentImageIndex]})`
              : 'linear-gradient(135deg, #e0e0e0 0%, #c0c0c0 100%)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              opacity: imageLoaded ? 1 : 0,
              transition: 'opacity 0.1s ease, transform 0.3s ease',
            }}
          >
           {!imageLoaded && (
            <SmallLoading/>
            )}
              <img  
              src={list[currentImageIndex]}
              alt="profile"
              style={{
                display: 'none', 
              }}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageLoaded(false)} // Fallback if the image fails to load
            />

            {/* Left Arrow */}
            <IconButton
              sx={{
                position: 'absolute',
                top: '50%',
                left: '20px',
                transform: 'translateY(-50%)',
                color: '#fff',
              }}
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
            >
              <ArrowBackIos />
            </IconButton>

            {/* Right Arrow */}
            <IconButton
              sx={{
                position: 'absolute',
                top: '50%',
                right: '20px',
                transform: 'translateY(-50%)',
                color: '#fff',
              }}
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
            >
              <ArrowForwardIos />
            </IconButton>

            {/* Close Button */}
            <IconButton
              sx={{
                position: 'absolute',
                top: '20px',
                left: '20px',
                color: '#fff',
              }}
              onClick={(e) => {
                e.stopPropagation();
                setImageClick(false);
              }}
            >
              <i className="ti ti-arrow-left" style={{ fontSize: "24px" }}></i>
            </IconButton>

            {/* ✅ Dots Indicator */}
            <Box
              sx={{
                position: 'absolute',
                top: '10px',
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                gap: '6px',
              }}
            >
              {list.map((_, index) => (
                <Box
                  key={index}
                  sx={{
                    width: "48px",
                    height: "4px",
                    borderRadius: "15%",
                    backgroundColor: index === currentImageIndex ? '#fff' : '#888',
                    opacity: index === currentImageIndex ? 1 : 0.5,
                    transition: 'opacity 0.3s ease',
                  }}
                />
              ))}
            </Box>
          </Box>
        }


    <Box sx={ {
      background: "linear-gradient(180deg, rgba(245, 245, 245, 0) 0%, #F5F5F5 26%)",
      minHeight: "100vh",
      padding: {
        xs: "18px",
        sm: "18px",
        md: "24px",
      },
    }}>
     
      <Box sx={{
    maxHeight: "75vh",
    overflowY: "auto",
    "&::-webkit-scrollbar": {
      display: "none", 
    },
  }}>
        <Grid container spacing={{ xs: 1, sm: 2 }} columns={{ xs: 2, sm: 2 }}>
          {profiles.map((profile, index) => (
            <Grid item xs={1} key={index} onClick={()=> setImageClick(true)}>
               <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  overflow: "hidden",
                  boxShadow: "none",
                  background: "transparent",
                  height: "100%",
                  position: "relative",
                  textAlign:'left',
                }}
              >
                <CardMedia
                  component="img"
                  image={profile.imageUrl}
                  alt={profile.imageAlt}
                  sx={{
                    width: "100%",
                    height: "200px",
                    borderRadius: "26px",
                    objectFit: "cover",
                  }}
                />

<Box
    sx={{
      position: "absolute",
      top: "60%", // Center vertically
      left: "80%", // Center horizontally
      transform: "translate(-50%, -20%)", // Adjust positioning slightly upwards
      display: "flex",
      gap: 2,
    }}
  >
         <IconButton
           onClick={(e) => {e.stopPropagation(); console.log("UnLIke Clicked"); setModalOpen(true)}}
           sx={{
            width:'42px',
            height:'42px',
             color: "white",
             backgroundColor: "rgba(0, 0, 0, 0.5)",
             padding: "12px",
             borderRadius: "50%",
             "&:hover": {
               backgroundColor: "rgba(0, 0, 0, 0.7)",
             },
           }}
         >
           <i className="ti ti-x" style={{ fontSize: "24px" }}></i>
         </IconButton>
  </Box>

                <CardContent sx={{ paddingBottom: "12px !important", paddingTop:'6px !important'}}>
                  <Typography sx={nameStyle}>{profile.name}</Typography>
                  <Typography sx={detailsStyle}>{profile.details}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
    <Drawer imageClick={imageClick}  profile={profile} key={profile.reg_no} />
 </> );
};

export default ProfileGrid;
