export const cleanObject = (
  obj: Record<string, any>,
  deep: boolean = false
): Record<string, any> => {
  if (typeof obj !== "object" || obj === null) return obj;

  return Object.entries(obj).reduce((acc, [key, value]) => {
    if (value === null || value === undefined || value === "") return acc;

    if (deep && typeof value === "object") {
      const cleanedValue = cleanObject(value, true);
      if (Object.keys(cleanedValue).length !== 0) {
        acc[key] = cleanedValue;
      }
    } else {
      acc[key] = value;
    }

    return acc;
  }, {} as Record<string, any>);
};
