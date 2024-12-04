import { useCallback, useMemo } from "react";
import {
  Assignment,
  AutoAwesome,
  BarChart,
  Checklist,
  Dashboard,
  Insights,
  Logout,
  Palette,
  Phone,
  Description,
  QueryStats,
  School,
  Settings,
  SupportAgent,
} from "@mui/icons-material";
import { Avatar, Typography } from "@mui/material";
import { useAuth } from "@/lib/contexts/AuthContext";
import { SidebarItem } from "@/utils/types";

export const useSidebarItems = () => {
  const { user } = useAuth();

  const loggedUserRole = user?.role.toLowerCase() ?? "";
  const loggedUserName = useMemo(
    () => `${user?.firstName ?? "N"} ${user?.lastName ?? "A"}`,
    [user]
  );

  const sidebarTopItems: SidebarItem[] = useMemo(
    () => [
      {
        id: 1,
        title: "Dashboard",
        path: "/dashboard",
        icon: <Dashboard />,
        forWidget: ["adminDashboard", "teamsConvo"],
      },
      {
        id: 2,
        title: "Lean Canvas",
        path: `/${loggedUserRole}/learner/canvas`,
        icon: <Palette />,
        forWidget: ["canvas"],
      },
      {
        id: 3,
        title: "Documents",
        path: `/${loggedUserRole}/documentanalysis/dashboard`,
        icon: <Description />,
        forWidget: ["documentAI"],
      },
      {
        id: 4,
        title: "Resume",
        path: `/${loggedUserRole}/resumeanalysis/dashboard`,
        icon: <Description />,
        forWidget: ["resumeAI"],
      },
      {
        id: 5,
        title: "Chat",
        path: `/${loggedUserRole}/query-archive`,
        icon: <QueryStats />,
        forWidget: ["chat"],
      },
      {
        id: 6,
        title: "Insights",
        path: `/${loggedUserRole}/insights`,
        icon: <Insights />,
        forWidget: ["insights"],
      },
      {
        id: 7,
        title: "Essay",
        path: `/${loggedUserRole}/admission/dashboard`,
        icon: <School />,
        forWidget: ["essay"],
      },
      {
        id: 8,
        title: loggedUserRole !== "admin" ? "Workspace" : "Leaderboard",
        path: `/${loggedUserRole}/leaderboard`,
        icon: <BarChart />,
        forWidget: ["leaderboard"],
      },
      {
        id: 9,
        title: "Assignments",
        path: `/assignment`,
        icon: <Assignment />,
        forWidget: ["repAssignment"],
      },
      {
        id: 10,
        title: "Start Call",
        path: `/airoleplaycall`,
        icon: <Phone />,
        forWidget: ["startCall"],
      },
      {
        id: 11,
        title: "Teacher AI",
        path: `/${loggedUserRole}/teacherai/${
          loggedUserRole === "admin" ? "dashboard" : "tutor"
        }`,
        icon: <AutoAwesome />,
        forWidget: ["teacherAI"],
      },
      {
        id: 12,
        title: "Assessment",
        path: `/${loggedUserRole}/psych/dashboard`,
        icon: <Checklist />,
        forWidget: ["psychAI"],
      },
      {
        id: 13,
        title: "Assistant AI",
        path: `/${loggedUserRole}/assistantai`,
        icon: <SupportAgent />,
        forWidget: ["assistantAI"],
      },
    ],
    [loggedUserRole]
  );

  const sidebarBottomItems: SidebarItem[] = useMemo(
    () => [
      {
        id: 1,
        title: "Settings",
        path: "/settings",
        icon: <Settings />,
        forWidget: ["settings"],
      },
      {
        id: 2,
        title: loggedUserName,
        path: "/profile",
        icon: (
          <Avatar sx={{ bgcolor: "success.main", width: 24, height: 24 }}>
            <Typography variant="caption">
              {`${loggedUserName.split(" ")[0][0]}${
                loggedUserName.split(" ")[1][0]
              }`}
            </Typography>
          </Avatar>
        ),
        forWidget: ["settings"],
      },
      {
        id: 3,
        title: "Logout",
        path: "/logout",
        icon: <Logout />,
        forWidget: ["*"],
      },
    ],
    [loggedUserName]
  );

  return { sidebarTopItems, sidebarBottomItems };
};
