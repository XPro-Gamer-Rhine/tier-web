import { SvgIconProps } from "@mui/material/SvgIcon";
export interface SidebarItem {
  id: number;
  title: string;
  path: string;
  icon: React.ReactElement<SvgIconProps>;
  forWidget: string[];
}

export interface User {
  role: string;
  firstName: string;
  lastName: string;
}
