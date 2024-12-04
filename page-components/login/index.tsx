"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import {
  Button,
  Box,
  Typography,
  IconButton,
  Link,
  Alert,
} from "@mui/material";
import { useRouter } from "nextjs-toploader/app";
import { useEffect, useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Image from "next/image";
import { useAuth } from "@/lib/contexts/AuthContext";

import useApi from "@/hooks/useApi";
import Field from "@/components/field/field";

interface IFormInput {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const { userLogin, loginLoader, user } = useAuth();
  const [loginError, setLoginError] = useState<string | null>(null);
  const organization = JSON.parse(localStorage.getItem("organization")!) || {};
  const [showPassword, setShowPassword] = useState(false);

  const { call } = useApi({
    fetchers: [(formData) => userLogin(formData)],
  });

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setLoginError(null);
    try {
      await call(data);
    } catch (error) {
      setLoginError("Login failed");
    }
  };

  const labelStyle = {
    fontFamily: "Lexend",
    fontSize: "14px",
    fontWeight: 300,
    lineHeight: "21px",
    letterSpacing: "-0.0031em",
    color: "#243030",
    marginBottom: "4px",
  };

  const inputStyle = {
    width: "100%",
    height: "48px",
    padding: "12px 16px",
    borderRadius: "4px",
    border: "1px solid #DAE8E7",
    background: "#fff",
    fontFamily: "Lexend",
    fontSize: "14px",
    fontWeight: 300,
    lineHeight: "21px",
    letterSpacing: "-0.0031em",
    color: "#243030",
    "&:focus": {
      outline: "none",
      border: "1px solid #2AA87E",
    },
  };

  const errorStyle = {
    fontFamily: "Lexend",
    fontSize: "12px",
    fontWeight: 300,
    lineHeight: "15px",
    letterSpacing: "-0.0031em",
    color: "#E03838",
  };

  const loginButtonStyle = {
    height: "48px",
    borderRadius: "4px",
    background: "#2AA87E",
    fontFamily: "Lexend",
    fontSize: "16px",
    fontWeight: 500,
    lineHeight: "24px",
    letterSpacing: "-0.0031em",
    color: "#fff",
    marginTop: "24px",
    "&:hover": {
      background: "#2AA87E",
      opacity: 0.8,
    },
    "&:disabled": {
      background: "#B0C4BC",
      color: "#fff",
      cursor: "not-allowed",
    },
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {loginError && <Alert severity="error">{loginError}</Alert>}

        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            width: 384,
            borderRadius: "8px",
            border: "1px solid #DAE8E7",
            background: "#fff",
            boxShadow: "0px 16px 64px rgba(10, 18, 20, 0.125)",
            padding: "48px",
            "@media (min-width: 320px) and (max-width: 480px)": {
              width: "100%",
              padding: "30px",
            },
          }}
        >
          {organization ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "100px",
                marginBottom: "20px",
              }}
            >
              <Image
                src={organization.loginLogo}
                alt="Organization Logo"
                width={100}
                height={100}
                style={{
                  objectFit: "contain",
                  maxWidth: "100%",
                  maxHeight: "100%",
                }}
              />
            </Box>
          ) : (
            <Typography
              variant="h3"
              sx={{
                fontFamily: "Lexend",
                fontSize: "20px",
                fontWeight: 300,
                lineHeight: "25px",
                letterSpacing: "-0.0031em",
                textAlign: "left",
                paddingBottom: "16px",
                color: "#243030",
                borderBottom: "1px solid #DAE8E7",
                marginBottom: "24px",
              }}
            >
              Login
            </Typography>
          )}

          <Box sx={{ border: "none" }}>
            <Field
              register={register("email", {
                required: "Email is required.",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Email must be a valid email address.",
                },
              })}
              placeholder="Your email address"
              name="email"
            />

            {!!errors?.email?.message && (
              <Typography
                sx={{
                  ...errorStyle,
                  marginBottom: "-5px",
                  marginTop: "1px !important",
                }}
              >
                {errors.email.message}
              </Typography>
            )}
          </Box>

          <Box sx={{ marginTop: "12px", position: "relative" }}>
            <Field
              register={{
                ...register("password", {
                  required: "Password is required.",
                }),
              }}
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              name="password"
            />

            <IconButton
              onClick={togglePasswordVisibility}
              sx={{
                position: "absolute",
                top: "50%",
                right: "10px",
                transform: "translateY(-50%)",
                color: "#5B706F",
              }}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>

            {!!errors?.password?.message && (
              <Typography
                sx={{
                  ...errorStyle,
                  marginBottom: "-5px",
                  marginTop: "1px !important",
                }}
              >
                {errors.password.message}
              </Typography>
            )}
          </Box>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={loginButtonStyle}
            disabled={loginLoader}
          >
            {loginLoader ? "Loading..." : "Log In"}
          </Button>

          {loginError && (
            <Typography
              sx={{
                fontFamily: "Lexend",
                textAlign: "center",
                fontSize: "14px",
                lineHeight: "21px",
                fontWeight: 300,
                color: "#E03838",
                marginTop: "12px",
              }}
            >
              {loginError}
            </Typography>
          )}

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "24px",
            }}
          >
            <Link
              href="/forget-password"
              sx={{
                fontFamily: "Lexend",
                fontSize: "15px",
                fontWeight: 300,
                lineHeight: "21px",
                letterSpacing: "-0.0031em",
                textAlign: "center",
                color: "#243030",
                transition: "all 0.2s ease",
                "&:hover": {
                  color: "#2AA87E",
                  textDecoration: "underline",
                },
              }}
            >
              Forgot password?
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
