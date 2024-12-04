import { useState, useMemo } from "react";

interface UseTableSearchParams<T> {
  data: T[] | undefined;
  searchFields: (keyof T)[];
  dateRangeColumn: keyof T;
}

interface UseTableSearchResult<T> {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  filteredData: T[];
  startDate: string;
  setStartDate: React.Dispatch<React.SetStateAction<string>>;
  endDate: string;
  setEndDate: React.Dispatch<React.SetStateAction<string>>;
}

export const useTableSearch = <T extends Record<string, any>>({
  data,
  searchFields,
  dateRangeColumn,
}: UseTableSearchParams<T>): UseTableSearchResult<T> => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const filteredData = useMemo(() => {
    if (!data) return [];

    return data.filter((item) => {
      const itemDate = new Date(item[dateRangeColumn] as string).getTime();

      const isWithinDateRange =
        (!startDate || new Date(startDate).getTime() <= itemDate) &&
        (!endDate || new Date(endDate).setHours(23, 59, 59, 999) >= itemDate);

      if (!isWithinDateRange) return false;

      return searchFields.some((field) => {
        const fieldValue = item[field];

        if (typeof fieldValue === "string" && !isNaN(Date.parse(fieldValue))) {
          const formattedDate = new Date(fieldValue)
            .toISOString()
            .split("T")[0];
          return formattedDate.includes(searchTerm);
        }

        return fieldValue
          ?.toString()
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
    });
  }, [data, searchTerm, searchFields, startDate, endDate, dateRangeColumn]);

  return {
    searchTerm,
    setSearchTerm,
    filteredData,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
  };
};
