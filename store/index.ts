import { create } from "zustand";

interface EmployeeVisibilityState {
  employees: Record<string, boolean>;
  toggleEmployee: (employee: string) => void;
  sort: "Ascending" | "Descending" | "None";
  setSort: (sort: "Ascending" | "Descending" | "None") => void;
  filterBy: "Best" | "Average" | "Low" | "None";
  setFilterBy: (filterBy: "Best" | "Average" | "Low" | "None") => void;
  type: "year" | "4 week" | "week" | "month";
  setType: (type: "4 week" | "week" | "month" | "year") => void;
  dataForExport: any[];
  setDataForExport: (data: any[]) => void;
}

export const useEmployeeVisibilityStore = create<EmployeeVisibilityState>(
  (set) => ({
    employees: {
      Cut: true,
      Temp: true,
      Pol: true,
      CNC: true,
      IG: true,
      Lami: true,
      Span: true,
      Creating: true,
      Crating: true,
      Loading: true,
    },
    sort: "None",
    toggleEmployee: (employee: string) =>
      set((state) => ({
        employees: {
          ...state.employees,
          [employee]: !state.employees[employee],
        },
      })),
    setSort: (sort: "Ascending" | "Descending" | "None") => set({ sort }),
    filterBy: "None",
    setFilterBy: (filterBy: "Best" | "Average" | "Low" | "None") =>
      set({ filterBy }),
    type: "week",
    setType: (type: "4 week" | "week" | "month" | "year") => set({ type }),
    dataForExport: [],
    setDataForExport: (data: any[]) => set({ dataForExport: data }),
  })
);
