"use client";

import { useAuth } from "@/lib/contexts/AuthContext";
import { UserRole } from "@/utils/enums";
import { Box } from "@mui/material";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export interface User {
  id: string;
  email: string;
  role: UserRole;
  name?: string;
}

interface MainWrapperProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

const MainWrapper: React.FC<MainWrapperProps> = ({
  children,
  allowedRoles = [],
}) => {
  const { user, authenticated } = useAuth();

  useEffect(() => {
    // if (!authenticated) {
    //   redirect("/login");
    // }

    if (
      allowedRoles.length > 0 &&
      !allowedRoles.includes(user?.role as UserRole)
    ) {
      redirect("/unauthorized");
    }
  }, [authenticated, user?.role, allowedRoles]);

  if (
    !authenticated ||
    (allowedRoles.length > 0 && !allowedRoles.includes(user?.role as UserRole))
  ) {
    return null;
  }

  return <Box>{children}</Box>;
};

export default MainWrapper;
