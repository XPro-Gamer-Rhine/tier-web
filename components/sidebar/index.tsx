"use client";
import {
  Avatar,
  Box,
  Drawer,
  IconButton,
  Link as RouterLink,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";

import { Menu, MenuOpen } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSidebarItems } from "./sidebar-item";
import Link from "next/link";
import { useAuth } from "@/lib/contexts/AuthContext";
import {
  getOrganizationDetails,
  getOrganizationMeta,
  userDetails,
} from "@/utils/api";

const SidebarItem = ({
  title,
  path,
  icon,
  onClick,
  isActive,
}: {
  title: string;
  path: string;
  icon: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  isActive: boolean;
}) => {
  return (
    <Link href={path} passHref>
      <ListItemButton
        selected={isActive}
        sx={{
          color: isActive ? "success.main" : "background.paper",
          backgroundColor: isActive ? "#1F1F1F" : "transparent",
          "&:hover": {
            backgroundColor: "#2C2C2C",
          },
          padding: "12px 20px",
        }}
        onClick={(e: any) => {
          if (onClick) onClick(e);
        }}
      >
        <ListItemIcon
          sx={{ color: isActive ? "success.main" : "background.paper" }}
        >
          {icon}
        </ListItemIcon>
        <ListItemText primary={title} />
      </ListItemButton>
    </Link>
  );
};

export const Sidebar = () => {
  const path = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [activePath, setActivePath] = useState(path);
  const { sidebarTopItems, sidebarBottomItems } = useSidebarItems();
  const router = useRouter();
  const { organization } = useAuth();

  const accessibleMenus = organization?.role?.widgtes ?? [];

  const sidebarUrls = [
    ...sidebarTopItems.map((item) => item.path),
    ...sidebarBottomItems.map((item) => item.path),
  ];

  useEffect(() => {
    if (sidebarUrls.includes(path)) {
      setActivePath(path);
    }
  }, [path]);

  return (
    <Drawer
      className={`sidebarDrawer ${collapsed ? "sidebarDrawer-collapsed" : ""}`}
      variant="permanent"
      sx={{
        width: collapsed ? 70 : 220,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: collapsed ? 70 : 220,
          backgroundColor: "#121212",
          color: "background.paper",
          boxSizing: "border-box",
          transition: "width 0.3s",
          overflowX: "hidden",
        },
      }}
    >
      <Box sx={{ padding: "10px" }}>
        <IconButton onClick={() => setCollapsed((prev) => !prev)}>
          {collapsed ? <Menu color="success" /> : <MenuOpen color="success" />}
        </IconButton>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          padding: "10px 10px",
          gap: 3,
          textOverflow: "unset",
        }}
      >
        {!organization?.navbarLogo ? (
          <Skeleton
            variant="rectangular"
            sx={{ backgroundColor: "GrayText", borderRadius: 0.5 }}
          >
            <Avatar variant="rounded" />
          </Skeleton>
        ) : (
          <Avatar
            src={organization?.navbarLogo}
            alt="Logo"
            variant="rounded"
            sx={{
              width: 40,
              "& img": {
                objectFit: "contain",
              },
            }}
          />
        )}
        <Typography variant="h6" color="primary" noWrap>
          TIER ONE
        </Typography>
      </Box>
      <Stack
        height={"100vh"}
        sx={{
          justifyContent: "space-between",
        }}
      >
        <List>
          {sidebarTopItems
            .filter((item) => {
              if (item.forWidget.includes("*")) return true;
              return item.forWidget.some((widget) =>
                accessibleMenus.includes(widget)
              );
            })
            .map((item) => (
              <SidebarItem
                key={item.id}
                title={item.title}
                path={item.path}
                icon={item.icon}
                isActive={activePath === item.path}
              />
            ))}
        </List>

        <List>
          {sidebarBottomItems
            .filter((item) => {
              if (item.forWidget.includes("*")) return true;
              return item.forWidget.some((widget) =>
                accessibleMenus.includes(widget)
              );
            })
            .map((item) => (
              <SidebarItem
                key={item.id}
                title={item.title}
                path={item.path}
                icon={item.icon}
                isActive={activePath === item.path}
                onClick={(e: any) => {
                  if (item.title === "Logout") {
                    e.preventDefault();
                    router.push("/logout");
                  }
                }}
              />
            ))}
        </List>
      </Stack>
    </Drawer>
  );
};
