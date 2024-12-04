import { colorPalette } from "@/styles/styles";
import {
  CircularProgress,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  SelectProps,
} from "@mui/material";

import MultiSelect from "../multiselect";

interface Option {
  value: string | number;
  label: string;
}

interface Field {
  name: string;
  label: string;
  type: "text" | "select" | "multiSelect";
  options?: Option[];
  multiline?: boolean;
}

interface FormFieldProps {
  formType?: "ADD" | "EDIT";
  field: Field;
  register: (name: any) => {
    onChange?: (e: React.ChangeEvent<any>) => void;
    onBlur?: (e: React.FocusEvent<any>) => void;
    ref?: (instance: HTMLInputElement | null) => void;
    name: string;
  };
  errors: any;
  watch: (name: string) => any;
  loading: boolean;
  state: Record<string, any>;
  stateUpdater: any;
  hookFormUpdater: any;
  hookFormTrigger: any;
  disabled?: boolean;
}

const getComponentProps = ({
  formType,
  componentType,
}: {
  formType: "ADD" | "EDIT";
  componentType: "stack" | "input" | "select";
}) => {
  const baseProps = {
    stack: {
      direction: "row",
      sx: { alignItems: "center" },
    },
    input: {
      fullWidth: true,
      sx: { flex: 1 },
    },
  };

  const addTypeProps = {
    stack: {
      sx: {
        background: colorPalette.background.paper,
        px: 2,
        py: 4,
        borderRadius: 2,
      },
    },
    input: {
      sx: { flex: 1 },
      size: "small",
    },
    select: { size: "small" },
  };

  return formType === "ADD"
    ? addTypeProps[componentType as keyof typeof addTypeProps]
    : baseProps[componentType as keyof typeof baseProps];
};

export const FormField: React.FC<FormFieldProps> = ({
  formType = "EDIT",
  field,
  register,
  errors,
  watch,
  loading,
  state,
  stateUpdater,
  hookFormUpdater,
  hookFormTrigger,
  disabled = false,
}) => {
  const { name, label, type, options, ...rest } = field;

  const handleMultiSelectChange = ({
    name,
    values,
  }: {
    name: string;
    values: string[];
  }) => {
    stateUpdater((prev: any) => ({ ...prev, [name]: values }));
    hookFormUpdater(name, values);
    hookFormTrigger(name);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    stateUpdater((prev: any) => ({
      ...prev,
      [name]: value,
    }));
    hookFormUpdater(name, value);
    hookFormTrigger(name);
  };

  const renderField = () => {
    switch (type) {
      case "text":
        return (
          <TextField
            {...(getComponentProps({
              formType,
              componentType: "input",
            }) as any)}
            disabled={disabled}
            label={formType === "ADD" ? label : ""}
            value={watch(name) || ""}
            {...register(name)}
            error={!!errors[name]}
            helperText={errors[name]?.message || ""}
            onChange={handleInputChange}
            multiline={rest.multiline}
            rows={4}
          />
        );
      case "select":
        return (
          <FormControl fullWidth={formType === "EDIT"} sx={{ flex: 1 }}>
            {formType === "ADD" && (
              <InputLabel id={name} size="small">
                {label}
              </InputLabel>
            )}
            <Select
              {...(getComponentProps({
                formType,
                componentType: "select",
              }) as SelectProps<string>)}
              {...register(name)}
              disabled={disabled}
              label={formType === "ADD" ? label : ""}
              labelId={name}
              id={name}
              error={!!errors[name]}
              value={!loading ? watch(name) || "" : ""}
              onChange={(e) => {
                handleInputChange(e as React.ChangeEvent<HTMLInputElement>);
                hookFormUpdater(name, e.target.value, { shouldValidate: true });
              }}
            >
              {loading ? (
                <MenuItem disabled>
                  <CircularProgress size={24} />
                  <span style={{ marginLeft: 10 }}>Loading...</span>
                </MenuItem>
              ) : (
                options?.map((option, i) => (
                  <MenuItem key={`${option.value}-${i}`} value={option.value}>
                    {option.label || ""}
                  </MenuItem>
                ))
              )}
            </Select>
            <FormHelperText error={!!errors[name]}>
              {errors[name]?.message || ""}
            </FormHelperText>
          </FormControl>
        );
      case "multiSelect":
        return (
          <FormControl fullWidth sx={{ flex: 1 }}>
            <MultiSelect
              {...(getComponentProps({
                formType,
                componentType: "select",
              }) as any)}
              {...register(name)}
              disabled={disabled}
              error={!!errors[name]}
              errorMessage={errors[name]?.message || ""}
              loading={loading}
              options={options || []}
              selectedValues={state[name] || []}
              handleSelectionChange={(e) => {
                const selectedValues = e.target.value as string[];
                handleMultiSelectChange({ name, values: selectedValues });
              }}
              handleDelete={(valueToDelete) => {
                const updatedValues = (state[name] || []).filter(
                  (value: string) => value !== valueToDelete
                );
                handleMultiSelectChange({ name, values: updatedValues });
              }}
            />
          </FormControl>
        );
      default:
        return null;
    }
  };

  if (formType === "ADD") {
    return renderField();
  }

  return (
    <Stack
      {...(getComponentProps({
        componentType: "stack",
        formType: "EDIT",
      }) as any)}
    >
      {formType === "EDIT" && <Typography sx={{ flex: 1 }}>{label}</Typography>}
      {renderField()}
    </Stack>
  );
};

export default FormField;
