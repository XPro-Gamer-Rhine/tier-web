import { format } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";

export const FORMAT_STRING = "MMMM do, yyyy";

export const parseDate = (dateString: string): Date => {
  const formattedDate = dateString.replace(/(\d+)(th|nd|rd|st)/, "$1");
  return new Date(formattedDate);
};

export interface GetOriginalZonedDateParams {
  date: Date | string;
  formatString?: string;
}

export const getOriginalZonedDate = ({
  date,
  formatString = FORMAT_STRING,
}: GetOriginalZonedDateParams): string => {
  const parsedDate = typeof date === "string" ? new Date(date) : date;

  const utcDate = utcToZonedTime(
    parsedDate,
    Intl.DateTimeFormat().resolvedOptions().timeZone
  );

  const formattedDate = format(utcDate, formatString);

  return formattedDate;
};
