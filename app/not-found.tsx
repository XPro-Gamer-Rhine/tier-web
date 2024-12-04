"use client";

import { Box, Button, Container, Typography } from "@mui/material";
import Link from "next/link";
import { keyframes } from "@mui/system";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const pulse = keyframes`
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.7;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

export default function NotFound() {
  const router = useRouter();
  useEffect(() => {
    const currentOrganization = JSON.parse(
      localStorage.getItem("organization") || "{}"
    );
    localStorage.clear();
    router.push(`/${currentOrganization.organizationName}/login`);
  }, []);

  
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        textAlign: "center",
      }}
    >
      <Box
        sx={{
          width: "200px",
          height: "200px",
          mb: 4,
          animation: `${pulse} 2s infinite ease-in-out`,
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#FF0000FF"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
          <line x1="4" y1="4" x2="20" y2="20" />
        </svg>
      </Box>
      <Typography
        gutterBottom
        sx={{ fontWeight: "bold", color: "red", fontSize: "70px" }}
      >
        404
      </Typography>
      <Typography
        variant="h5"
        component="h2"
        gutterBottom
        sx={{ mb: 4, color: "red", fontSize: "30px" }}
      >
        Oops! Page not found
      </Typography>
      <Button
        component={Link}
        href="/"
        variant="contained"
        sx={{
          backgroundColor: "#1AA554FF",
          color: "primary.contrastText",
          "&:hover": {
            backgroundColor: "#0E6131FF",
          },
        }}
      >
        Go back home
      </Button>
    </Container>
  );
}
