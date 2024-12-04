import { create } from "zustand";

export const useConvoDashboardStore = create((set) => ({
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

  setTeamList: (teamList: any) => set({ teamList }),
  setAdminList: (adminList: any) => set({ adminList }),
  setSalesRepList: (salesRepList: any) => set({ salesRepList }),

  updateTeamItem: (updatedItem: { _id: any }) =>
    set((state: { teamList: any[] }) => ({
      teamList: state.teamList.map((item: { _id: any }) =>
        item._id === updatedItem._id ? { ...item, ...updatedItem } : item
      ),
    })),
  updateSalesRepItem: (updatedItem: { _id: any }) => {
    return set((state: { salesRepList: any[] }) => ({
      salesRepList: state.salesRepList.map((item: { _id: any }) =>
        item._id === updatedItem._id ? { ...item, ...updatedItem } : item
      ),
    }));
  },
  updateAdminItem: (updatedItem: { id: any }) =>
    set((state: { adminList: any[] }) => ({
      adminList: state.adminList.map((item: { id: any }) =>
        item.id === updatedItem.id ? { ...item, ...updatedItem } : item
      ),
    })),

  setDeleteDialog: ({ isOpen, forItem, onOk }: any) => {
    set((state: { deleteDialog: any }) => ({
      deleteDialog: {
        ...state.deleteDialog,
        isOpen,
        forItem,
        onOk,
      },
    }));
  },
  setEditDialog: ({ isOpen, forItem, onOk, data }: any) => {
    set((state: { deleteDialog: any }) => ({
      editDialog: {
        ...state.deleteDialog,
        isOpen,
        forItem,
        onOk,
        data,
      },
    }));
  },
}));
