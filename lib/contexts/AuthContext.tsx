import { createContext, useContext, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  userDetails,
  getNotificationCount,
  getOrganizationDetails,
  loginUser,
  getOrganizationMeta,
} from "@/utils/api";
import useApi from "@/hooks/useApi";
import { UserRole } from "@/utils/enums";

const ROLE_ROUTES: Record<any, string> = {
  [UserRole.ADMIN]: "/dashboard",
  [UserRole.COACH]: "/coach/dashboard",
  [UserRole.STUDENT]: "/student/dashboard",
  [UserRole.SALES_REP]: "/sales_rep/dashboard",
  [UserRole.AGENT]: "/agent/dashboard",
};

interface User {
  id: string;
  email: string;
  role: UserRole;
  assigneeIds: any[];
  course: string;
  createdAt: string;
  demographics: any[];
  firstName: string;
  isConsentAcknowledged: boolean;
  lastName: string;
  password: string;
  region: string;
  teamIds: any[];
  school: string;
  teamName: string;
  _id: string;
  organization_id: string;
  organizationName?: string;
  organizationType?: string;
}

interface Organization {
  organizationName: string;
  [key: string]: any;
}

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  organization: Organization | null;
  setOrganization: (organization: Organization | null) => void;
  loading: boolean;
  userLogin: (data: {
    email: string;
    password: string;
  }) => Promise<string | null>;
  loginLoader: boolean;
  logout: () => void;
  authenticated: boolean;
  notificationCount: number;
  isRouteAllowed: (path: string) => boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [organization, setOrganization] = useState<Organization | null>(null);
  const [loading, setLoading] = useState(true);
  const [loginLoader, setLoginLoader] = useState(false);
  const [authenticated, setIsAuthenticated] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);

  const { call: getUserDetails } = useApi({
    fetchers: [
      () => userDetails(),
      () => {
        const orgName =
          organization?.organizationName ||
          JSON.parse(localStorage.getItem("organization") || "{}")
            .organizationName;
        return getOrganizationMeta(orgName);
      },
    ],
  });

  const router = useRouter();
  const path = usePathname();

  const isRouteAllowed = (currentPath: string): boolean => {
    if (!user) return false;

    const roleRoutePrefix = ROLE_ROUTES[user.role];

    return currentPath.startsWith(roleRoutePrefix);
  };

  const initializeUser = async () => {
    try {
      const storedUserString = localStorage.getItem("user");
      const token = localStorage.getItem("token");
      const organizationMeta = JSON.parse(
        localStorage.getItem("organizationMeta") || "{}"
      );

      if (storedUserString && token && organizationMeta) {
        const storedUser = JSON.parse(storedUserString) as User;
        setUser(storedUser);
        setIsAuthenticated(true);
        setOrganization(organizationMeta);
      } else {
        const response = await getUserDetails();
        localStorage.setItem(
          "organizationMeta",
          JSON.stringify(response.results[1])
        );
        if (response?.results[0]?.user) {
          const organization = JSON.parse(
            localStorage.getItem("organizationMeta") || "{}"
          );
          setOrganization(organization);
          const userData = {
            ...response.results[0].user,
            organization_id: response.results[0].organization_id,
            organizationName: organization.organizationName,
            organizationType: response.results[0].organizationType,
          } as User;
          setUser(userData);
          localStorage.setItem("user", JSON.stringify(userData));
          setIsAuthenticated(true);

          if (!isRouteAllowed(path)) {
            const roleRoutePrefix = ROLE_ROUTES[userData.role];
            router.push(`${roleRoutePrefix}`);
          }
        } else if (!path.includes("forget-password")) {
          await redirectToLogin();
        } else {
          setIsAuthenticated(false);
          await redirectToLogin();
        }
      }
    } catch (error) {
      setIsAuthenticated(false);
      await redirectToLogin();
    }
  };

  const initializeNotifications = async () => {
    try {
      const count = await getNotificationCount();
      setNotificationCount(count);
    } catch (error) {
      setNotificationCount(0);
    }
  };

  const redirectToLogin = async () => {
    try {
      const orgDetails = await getOrganizationDetails(path.split("/")[1]);
      localStorage.setItem("organization", JSON.stringify(orgDetails.data));
      router.push(`/${orgDetails.data.organizationName}/login`);
    } catch {
      const storedOrganization = JSON.parse(
        localStorage.getItem("organization") || "{}"
      );
      router.push(`/${storedOrganization.organizationName}/login`);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        await initializeUser();
        await initializeNotifications();
      } catch (error) {
        console.error("Initialization error:", error);
        setIsAuthenticated(false);
        if (!path.includes("forget-password")) {
          await redirectToLogin();
        }
      } finally {
        setLoading(false);
      }
    })();
  }, [path]);

  const userLogin = async (data: { email: string; password: string }) => {
    setLoginLoader(true);
    try {
      const organization = JSON.parse(
        localStorage.getItem("organization") || "{}"
      );
      const response = await loginUser({
        ...data,
        organizationCode: organization.organizationName,
      });

      if (response.data.success && response.data.token) {
        localStorage.setItem("token", response.data.token);
        const userData = await getUserDetails();

        localStorage.setItem(
          "organizationMeta",
          JSON.stringify(userData.results[1])
        );
        const user = {
          ...userData.results[0].user,
          organization_id: userData.results[0].organization_id,
          organizationName: organization.organizationName,
          organizationType: userData.results[0].organizationType,
        } as User;
        setUser(user);
        setNotificationCount(await getNotificationCount());
        localStorage.setItem("user", JSON.stringify(user));
        setIsAuthenticated(true);

        const roleRoutePrefix = ROLE_ROUTES[user.role];
        router.push(`${roleRoutePrefix}`);

        return null;
      } else {
        return "Invalid username or password.";
      }
    } catch {
      return "Wrong Organization. Please try again.";
    } finally {
      setLoginLoader(false);
    }
  };

  const logout = () => {
    const currentOrganization = JSON.parse(
      localStorage.getItem("organization") || "{}"
    );
    setUser(null);
    setOrganization(null);
    setIsAuthenticated(false);
    setNotificationCount(0);
    localStorage.clear();
    localStorage.setItem("organization", JSON.stringify(currentOrganization));
    router.push(`/${currentOrganization.organizationName}/login`);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        organization,
        setOrganization,
        loading,
        userLogin,
        loginLoader,
        logout,
        authenticated,
        notificationCount,
        isRouteAllowed,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
