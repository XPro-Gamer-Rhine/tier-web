"use client";

import { Box, Button, Container, keyframes, Typography } from "@mui/material";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const OrganizationNotFound = () => {
  const handleContactAdmin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  return (
    <Container
      maxWidth="sm"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center",
      }}
    >
      <Typography
        variant="h4"
        component="div"
        gutterBottom
        color="#02BD8BFF"
        sx={{
          fontWeight: "bold",
          marginBottom: 4,
          letterSpacing: 2,
          animation: `${fadeIn} 1s ease-in-out`,
        }}
      >
        TIER WEB
      </Typography>
      <Box
        sx={{
          p: 4,
          borderRadius: 2,
          boxShadow: 3,
          backgroundColor: "#f5f5f5",
        }}
      >
        <Typography variant="h4" gutterBottom color="#413E3EFF">
          Organization Not Recognized
        </Typography>
        <Typography variant="body1" color="textSecondary" gutterBottom>
          Please select a valid organization or reach out to your administrator
          for assistance.
        </Typography>
        <Button
          variant="contained"
          onClick={handleContactAdmin}
          sx={{
            mt: 3,
            backgroundColor: "#02BD8BFF",
            transition: "transform 0.3s",
            "&:hover": {
              backgroundColor: "#1A9776FF",
              transform: "scale(1.05)",
            },
          }}
        >
          Contact Admin
        </Button>
      </Box>
    </Container>
  );
};

export default OrganizationNotFound;
