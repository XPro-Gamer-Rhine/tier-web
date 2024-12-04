"use client";

import { useAuth } from "@/lib/contexts/AuthContext";
import { useEffect } from "react";

const Logout = () => {
  const { logout } = useAuth();
  useEffect(() => {
    logout();
  }, []);
};

export default Logout;
