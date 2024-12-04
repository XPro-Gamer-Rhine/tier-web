import { create } from "zustand";

interface DialogState {
  isOpen: boolean;
  forItem: string;
  onOk: () => void;
  data?: any;
  dialogMode?: "edit" | "add";
}

interface StoreState {
  deleteDialog: DialogState;
  editDialog: DialogState;
  teamList: any[];
  salesRepList: any[];
  adminList: any[];

  setTeamList: (teamList: any[]) => void;
  setAdminList: (adminList: any[]) => void;
  setSalesRepList: (salesRepList: any[]) => void;

  updateTeamItem: (updatedItem: { _id: any }) => void;
  updateSalesRepItem: (updatedItem: { _id: any }) => void;
  updateAdminItem: (updatedItem: { id: any }) => void;

  setDeleteDialog: (params: {
    isOpen: boolean;
    forItem: string;
    onOk: () => void;
  }) => void;
  setEditDialog: (params: {
    isOpen: boolean;
    forItem: string;
    onOk: () => void;
    data: any;
  }) => void;
}

export const useConvoDashboardStore = create<StoreState>((set) => ({
  deleteDialog: { isOpen: false, forItem: "", onOk: () => {} },
  editDialog: {
    isOpen: false,
    forItem: "",
    onOk: () => {},
    data: {},
    dialogMode: "edit",
  },
  teamList: [],
  salesRepList: [],
  adminList: [],

  setTeamList: (teamList: any[]) => set({ teamList }),
  setAdminList: (adminList: any[]) => set({ adminList }),
  setSalesRepList: (salesRepList: any[]) => set({ salesRepList }),

  updateTeamItem: (updatedItem: { _id: any }) =>
    set((state) => ({
      teamList: state.teamList.map((item) =>
        item._id === updatedItem._id ? { ...item, ...updatedItem } : item
      ),
    })),
  updateSalesRepItem: (updatedItem: { _id: any }) => {
    return set((state) => ({
      salesRepList: state.salesRepList.map((item) =>
        item._id === updatedItem._id ? { ...item, ...updatedItem } : item
      ),
    }));
  },
  updateAdminItem: (updatedItem: { id: any }) =>
    set((state) => ({
      adminList: state.adminList.map((item) =>
        item.id === updatedItem.id ? { ...item, ...updatedItem } : item
      ),
    })),

  setDeleteDialog: ({
    isOpen,
    forItem,
    onOk,
  }: {
    isOpen: boolean;
    forItem: string;
    onOk: () => void;
  }) => {
    set((state) => ({
      deleteDialog: {
        ...state.deleteDialog,
        isOpen,
        forItem,
        onOk,
      },
    }));
  },

  setEditDialog: ({
    isOpen,
    forItem,
    onOk,
    data,
  }: {
    isOpen: boolean;
    forItem: string;
    onOk: () => void;
    data: any;
  }) => {
    set((state) => ({
      editDialog: {
        ...state.editDialog,
        isOpen,
        forItem,
        onOk,
        data,
      },
    }));
  },
}));
