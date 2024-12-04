import {
  AdminPanelSettings,
  PeopleAlt,
  SupportAgent,
} from "@mui/icons-material";
import TeamList from "./teams/team-list";

export const TabItems = [
  {
    label: "Teams",
    value: "teams",
    icon: <PeopleAlt />,
    content: <TeamList />,
  },
  {
    label: "Sales Representatives",
    value: "sales",
    icon: <SupportAgent />,
    content: null,
  },
  {
    label: "Admins",
    value: "admin",
    icon: <AdminPanelSettings />,
    content: null,
  },
];
