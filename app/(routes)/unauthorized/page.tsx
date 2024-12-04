"use client";

import { Box, Button, Container, Typography } from "@mui/material";
import Link from "next/link";
import { keyframes } from "@mui/system";

const tracePath = keyframes`
  0% {
    stroke-dashoffset: 1000;
  }
  100% {
    stroke-dashoffset: 0;
  }
`;

export default function Unauthorized() {
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
        }}
      >
        <svg
          fill="#0091ff"
          width="256px"
          height="256px"
          viewBox="-3.6 -3.6 27.20 27.20"
          xmlns="http://www.w3.org/2000/svg"
          stroke="#0091ff"
          stroke-width="0.0002"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            {" "}
            <g>
              {" "}
              <path d="M7.29,12H6.87A5.73,5.73,0,0,0,1,17.54,2.38,2.38,0,0,0,1,18H8.26A7,7,0,0,1,7,14,7.27,7.27,0,0,1,7.29,12ZM8.46,9.73A7,7,0,0,1,14,7a5.12,5.12,0,0,1,.56,0A4.93,4.93,0,0,0,15,5,5,5,0,1,0,8.46,9.73Z"></path>{" "}
              <path
                className="secondary"
                d="M14,8a6,6,0,1,0,6,6A6,6,0,0,0,14,8Zm0,10.8A4.8,4.8,0,1,1,18.8,14,4.8,4.8,0,0,1,14,18.8ZM17,12l-1-1-2,2-2-2-1,1,2,2-2,2,1,1,2-2,2,2,1-1-2-2Z"
              ></path>{" "}
            </g>{" "}
          </g>
        </svg>
      </Box>
      <Typography
        variant="h2"
        component="h1"
        gutterBottom
        sx={{ fontWeight: "bold", color: "#0099FFFF", fontSize: "60px" }}
      >
        403
      </Typography>
      <Typography
        gutterBottom
        sx={{ mb: 4, color: "#0099FFFF", fontSize: "30px" }}
      >
        Unauthorized Access
      </Typography>
      <Typography
        variant="body1"
        sx={{ mb: 4, color: "#272626FF", fontSize: "20px" }}
      >
        Sorry, you don't have permission to access this page.
      </Typography>
      <Button
        component={Link}
        href="/"
        variant="contained"
        sx={{
          backgroundColor: "primary.main",
          color: "primary.contrastText",
          "&:hover": {
            backgroundColor: "primary.dark",
          },
        }}
      >
        Go back home
      </Button>
    </Container>
  );
}
