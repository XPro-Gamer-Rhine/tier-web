type Item = Record<string, any>;

export const createSortedSelectOptions = (
  items: Item[] = [],
  valueKey: string = "id",
  labelKeys: string | string[] = ["name"]
): { value: any; label: string }[] => {
  const keys = Array.isArray(labelKeys) ? labelKeys : [labelKeys];

  const options = items.map((item) => {
    const label = keys
      .map((key) => item[key])
      .join(" ")
      .trim();
    return {
      value: item[valueKey],
      label,
    };
  });

  return options.sort((a, b) => a.label.localeCompare(b.label));
};
