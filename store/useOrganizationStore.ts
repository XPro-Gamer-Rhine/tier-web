import { create } from "zustand";

interface OrganizationRole {
  role: string;
  widgtes: string[];
  _id: string;
}

interface Organization {
  organizationName: string;
  loginLogo: string;
  navbarLogo: string;
  role: OrganizationRole;
}

interface OrganizationStore {
  organization: Organization | null;
  setOrganization: (organization: Organization) => void;
  clearOrganization: () => void;
  getOrganization: () => Organization | null;
}

const useOrganizationStore = create<OrganizationStore>((set) => ({
  organization: (() => {
    const storedData = localStorage.getItem("organization");
    return storedData ? JSON.parse(storedData) : null;
  })(),

  setOrganization: (organization) => {
    set({ organization });
    if (organization) {
      localStorage.setItem("organization", JSON.stringify(organization));
    } else {
      localStorage.removeItem("organization");
    }
  },

  clearOrganization: () => {
    set({ organization: null });
    localStorage.removeItem("organization");
  },

  getOrganization: () => {
    const storedData = localStorage.getItem("organization");
    return storedData ? JSON.parse(storedData) : null;
  },
}));

export default useOrganizationStore;
