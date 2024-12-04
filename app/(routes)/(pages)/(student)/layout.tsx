import type { Metadata } from "next";
import MainWrapper from "@/page-components/main-wrapper";
import { UserRole } from "@/utils/enums";

export const metadata: Metadata = {
  title: "Admin",
  description: "Generated by Dime Media LTD. ©️Copyright",
};

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <MainWrapper allowedRoles={[UserRole.STUDENT]}>{children}</MainWrapper>;
};

export default RootLayout;
