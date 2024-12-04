"use client";

import { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { keyframes } from "@mui/system";

const bounceAnimation = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
`;

const Error = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        bgcolor: "#f9f9f9",
        textAlign: "center",
        p: 2,
      }}
    >
      <ErrorOutlineIcon
        sx={{
          fontSize: 120,
          color: "error.main",
          animation: `${bounceAnimation} 2s infinite`,
        }}
      />
      <Typography
        variant="h4"
        sx={{ fontWeight: "bold", mt: 2, color: "#444141FF", fontSize: 50 }}
      >
        Uh-oh!
      </Typography>
      <Typography variant="h6" sx={{ mt: 1, color: "#444141FF" }}>
        OOPS! Something Went Wrong.
      </Typography>
    </Box>
  );
};

export default Error;
