<SwipeableDrawer
  anchor="bottom"
  open={isDrawerOpen}
  onClose={toggleDrawer(false)}
  onOpen={toggleDrawer(true)}
  sx={{
    height: '100vh', // Full viewport height
    '& .MuiDrawer-paper': {
      height: '100vh', // Ensures the drawer fills the viewport
      overflow: 'hidden', // Prevent overflow issues
    },
  }}
  disableSwipeToOpen={false}
>

  {/* Image Background Box */}
  <Box
    sx={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '50%', // Cover top half of drawer
      zIndex: 5,
      backgroundImage: imageLoaded
        ? `url(${list[currentImageIndex]})`
        : 'linear-gradient(135deg, #e0e0e0 0%, #c0c0c0 100%)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      opacity: imageLoaded ? 1 : 0,
      transition: 'opacity 0.1s ease',
    }}
  >
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

    {/* Dots Indicator */}
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
            width: '48px',
            height: '4px',
            borderRadius: '15%',
            backgroundColor: index === currentImageIndex ? '#fff' : '#888',
            opacity: index === currentImageIndex ? 1 : 0.5,
            transition: 'opacity 0.3s ease',
          }}
        />
      ))}
    </Box>
  </Box>

  {/* Form Content Box */}
  <Box
    component="form"
    sx={{
      position: 'absolute',
      top: '50%', // Start at the middle of the drawer
      left: 0,
      width: '100%',
      height: '50%', // Take bottom half
      overflowY: 'auto', // Allow scrolling if content overflows
      backgroundColor: '#fff',
      borderRadius: '24px 24px 0 0',
      padding: '16px',
      boxShadow: '0 -4px 12px rgba(0, 0, 0, 0.1)',
    }}
  >
    {/* Form Content */}
    <Box sx={{ mb: 1.25 }}>
      <Typography sx={{ fontSize: '28px', fontWeight: 700, mb: 1.25 }}>
        {profile.name}, {profile.age}
      </Typography>
      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
        {/* Gender */}
        <Chip
          icon={
            <i
              className={
                profile.gender === 'female'
                  ? 'ti ti-gender-female'
                  : 'ti ti-gender-male'
              }
              style={{ fontSize: '24px', color: 'white' }}
            />
          }
          label={profile.gender === 'female' ? 'Female' : 'Male'}
          sx={{
            bgcolor:
              profile.gender === 'female' ? '#FE6BA2' : '#7270F5',
            color: 'white',
            borderRadius: '8px',
            fontSize: '14px',
          }}
        />
      </Box>
    </Box>

    {/* About Section */}
    <Box sx={{ mt: 2, backgroundColor: '#FFFFFF', borderRadius: '24px' }}>
      <Typography sx={{ p: 1, fontWeight: 520, pl: 2, fontSize: '20px' }}>
        About
      </Typography>
      <Box
        sx={{
          display: 'flex',
          gap: 2.5,
          overflowX: 'auto',
          p: 2,
          pt: 0,
          '&::-webkit-scrollbar': { display: 'none' },
          scrollbarWidth: 'none',
          scrollSnapType: 'x mandatory',
          scrollBehavior: 'smooth',
        }}
      >
        {profile.bio}
      </Box>
    </Box>

    {/* Interests Section */}
    <Box sx={{ mt: 2, backgroundColor: '#FFFFFF', borderRadius: '24px' }}>
      <Typography sx={{ p: 1, fontWeight: 520, pl: 2, fontSize: '20px' }}>
        Interests
      </Typography>
      <Box
        sx={{
          display: 'flex',
          gap: 2.5,
          overflowX: 'auto',
          p: 2,
          pt: 0,
          '&::-webkit-scrollbar': { display: 'none' },
          scrollbarWidth: 'none',
          whiteSpace: 'nowrap',
          scrollSnapType: 'x mandatory',
          scrollBehavior: 'smooth',
        }}
      >
        {profile.interests.map((item, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <Avatar
              sx={{
                width: 45,
                height: 45,
                bgcolor: interests[item].bgcolor,
                color: interests[item].color,
                fontSize: '26px',
              }}
            >
              {interests[item].icon}
            </Avatar>
            <Typography variant="caption" sx={{ color: '#666' }}>
              {interests[item].label}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  </Box>
</SwipeableDrawer>
