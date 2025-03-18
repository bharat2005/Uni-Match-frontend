function AppContainer() {
    const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
    const [imageLoaded, setImageLoaded] = React.useState(false);
     const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
    const list = profile.images.filter(item => item != null);
    const [drawerHeight, setDrawerHeight] = React.useState(0);
  
    const toggleDrawer = (open) => (event) => {
      if (
        event &&
        event.type === "keydown" &&
        (event.key === "Tab" || event.key === "Shift")
      ) {
        return;
      }
      setIsDrawerOpen(open);
    };
  
    // Callback to capture drawer height and adjust the image container
    const handleDrawerOpen = () => {
      setDrawerHeight(window.innerHeight * 0.5); // Example: 50% of viewport height
      setIsDrawerOpen(true);
    };
  
    const handleDrawerClose = () => {
      setDrawerHeight(0);
      setIsDrawerOpen(false);
    };
  
  
  
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
  
  
  
  
    function emoji() {
      switch (profile.reason) {
        case "Casual Dating":
          return "🎉";
        case "Short-term fun":
          return "😍";
        case "Long-term relationship":
          return "💘";
        case "New friends":
          return "👋";
        case "Study buddy":
          return "📚";
        case "Still figuring it out":
          return "🤔";
        default:
          return "";
      }
    }
  
  
  
    return (
     <>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/dist/tabler-icons.min.css"
        />
  
        {/* Top Part with Image */}
        <Box
          sx={{
            height: `calc(${drawerHeight * 0.5}px)`, // Adjust height based on drawer position
            transition: "height 0.3s ease",
            background: `url(${profile.imageUrl}) center/cover`,
            width: "100vw",
            borderTopLeftRadius: "20px",
            borderTopRightRadius: "20px",
            overflow: "hidden",
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 1200,
          }}
        />
  
        {/* Drawer */}
        <SwipeableDrawer
          anchor="bottom"
          open={isDrawerOpen}
          onClose={handleDrawerClose}
          onOpen={handleDrawerOpen}
          sx={{
            "& .MuiDrawer-paper": {
              borderTopLeftRadius: "20px",
              borderTopRightRadius: "20px",
              background: "white",
              maxHeight: "90vh",
              width: "100vw",
              overflowY: "hidden",
            },
          }}
          disableSwipeToOpen={false}
        >
          {/* Inner Container */}
          <Box
            component="form"
            sx={{
              backgroundColor: "rgba(255, 255, 255, 1)",
              background: "linear-gradient(180deg, #FFFFFF 0%, #FDF3FD 25.5%)",
              padding: "20px",
              width: "100%",
              height: "auto",
              overflowY: "auto",
            }}
          >
            {/* Profile Header */}
            <Box sx={{ mb: 1.25 }}>
              <Typography sx={{ fontSize: "28px", fontWeight: 700, mb: 1.25 }}>
                {profile.name}, {profile.age}
              </Typography>
              <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                {/* Gender Chip */}
                <Chip
                  icon={
                    <i
                      className={
                        profile.gender === "female"
                          ? "ti ti-gender-female"
                          : "ti ti-gender-male"
                      }
                      style={{ fontSize: "24px", color: "white" }}
                    />
                  }
                  label={profile.gender === "female" ? "Female" : "Male"}
                  sx={{
                    bgcolor:
                      profile.gender === "female" ? "#FE6BA2" : "#7270F5",
                    color: "white",
                    borderRadius: "8px",
                    fontSize: "14px",
                  }}
                />
  
                {/* Personality Chip */}
                <Chip
                  icon={
                    profile.personality === "extrovert" ? (
                      <i
                        className="ti ti-sun-filled"
                        style={{ fontSize: "18px", color: "white" }}
                      />
                    ) : profile.personality === "introvert" ? (
                      <i
                        className="ti ti-moon-filled"
                        style={{ fontSize: "18px", color: "white" }}
                      />
                    ) : (
                      <i
                        className="ti ti-seedling-filled"
                        style={{ fontSize: "18px", color: "white" }}
                      />
                    )
                  }
                  label={
                    profile.personality === "extrovert"
                      ? "Extrovert"
                      : profile.personality === "introvert"
                      ? "Introvert"
                      : "Ambivert"
                  }
                  sx={{
                    bgcolor:
                      profile.personality === "extrovert"
                        ? "#FF5C5C"
                        : profile.personality === "introvert"
                        ? "#8A2BE2"
                        : "#32CD32",
                    color: "white",
                    borderRadius: "8px",
                    fontSize: "14px",
                  }}
                />
              </Box>
            </Box>
  
            {/* Reason Section */}
            <Typography variant="body2" sx={{ color: "#666", my: 1.25 }}>
              {profile.reason}
            </Typography>
  
            {/* About Section */}
            <Box
              sx={{
                mt: 2,
                backgroundColor: "#FFFFFF",
                borderRadius: "24px",
                p: 2,
              }}
            >
              <Typography sx={{ fontSize: "20px", fontWeight: 520 }}>
                About
              </Typography>
              <Typography>{profile.bio}</Typography>
            </Box>
  
            {/* Interests Section */}
            <Box
              sx={{
                mt: 2,
                backgroundColor: "#FFFFFF",
                borderRadius: "24px",
                p: 2,
                display: "flex",
                gap: 2.5,
                overflowX: "auto",
              }}
            >
              {profile.interests.map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <Avatar
                    sx={{
                      width: 45,
                      height: 45,
                      bgcolor: interests[item].bgcolor,
                      color: interests[item].color,
                    }}
                  >
                    {interests[item].icon}
                  </Avatar>
                  <Typography>{interests[item].label}</Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </SwipeableDrawer>
      </>
    );
  }
  
  export default AppContainer;
  