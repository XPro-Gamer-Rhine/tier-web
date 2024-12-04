import { create } from "zustand";

export const useAssessmentStore = create((set) => ({
  selectedSummarytab: "answer",

  setAssessmentSummaryTab: (tab: any) => set({ selectedSummarytab: tab }),
}));
