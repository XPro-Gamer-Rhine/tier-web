import CancelIcon from "@mui/icons-material/Cancel";
import {
  Box,
  Chip,
  CircularProgress,
  FormHelperText,
  MenuItem,
  Select,
  SelectProps,
  SelectChangeEvent,
} from "@mui/material";
import { forwardRef, useState, ReactNode } from "react";


interface Option {
  value: string | number;
  label: string;
}

interface MultiSelectProps
  extends Omit<SelectProps<string[]>, "onChange" | "value"> {
  options: Option[];
  selectedValues: string[]; 
  handleSelectionChange: (event: SelectChangeEvent<string[]>) => void;
  handleDelete: (value: string) => void;
  loading?: boolean;
  disabled?: boolean;
  error?: boolean;
  errorMessage?: string;
}

export const MultiSelect = forwardRef<HTMLDivElement, MultiSelectProps>(
  (
    {
      options = [],
      selectedValues = [],
      handleSelectionChange,
      handleDelete,
      loading = false,
      disabled = false,
      error = false,
      errorMessage = "",
      ...rest
    },
    ref
  ) => {
    const [open, setOpen] = useState(false);

    const handleChange = (
      event: SelectChangeEvent<string[]>,
      child?: ReactNode
    ) => {
      handleSelectionChange(event);
      setOpen(false);
    };

    return (
      <>
        <Select
          {...rest}
          multiple
          ref={ref}
          open={open}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
          error={error}
          value={selectedValues}
          onChange={handleChange}
          disabled={loading || disabled}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {(selected as string[]).map((value) => {
                const selectedOption =
                  options.find((option) => option.value === value) || null;

                return selectedOption ? (
                  <Chip
                    key={value}
                    label={selectedOption.label}
                    onMouseDown={(event) => event.stopPropagation()}
                    onClick={(e) => e.preventDefault()}
                    deleteIcon={
                      <CancelIcon sx={{ ":hover": { fill: "tomato" } }} />
                    }
                    onDelete={() => handleDelete(value)}
                  />
                ) : null;
              })}
            </Box>
          )}
        >
          {loading ? (
            <MenuItem disabled>
              <CircularProgress size={24} />
              <span style={{ marginLeft: 10 }}>Loading...</span>
            </MenuItem>
          ) : (
            options.map(({ value, label }) => (
              <MenuItem key={value} value={value}>
                {label}
              </MenuItem>
            ))
          )}
        </Select>
        <FormHelperText error={error}>{errorMessage}</FormHelperText>
      </>
    );
  }
);

MultiSelect.displayName = "MultiSelect";

export default MultiSelect;
