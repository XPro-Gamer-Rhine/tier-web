import {
  AdminPanelSettings,
  PeopleAlt,
  SupportAgent,
} from "@mui/icons-material";

export const TabItems = [
  {
    label: "Teams",
    value: "teams",
    icon: <PeopleAlt />,
    content: null,
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
