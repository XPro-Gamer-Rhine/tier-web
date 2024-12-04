import * as Yup from "yup";

export const addSR = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email format"),
});

export const addTeam = Yup.object().shape({
  name: Yup.string().required("Team name is required"),
  description: Yup.string().required("Description is required"),
  assignedReps: Yup.array()
    .of(Yup.string().required())
    .required("Assign at least one representative"),
  assignedPersonas: Yup.array()
    .of(Yup.string().required())
    .required("Assign at least one persona"),
  role: Yup.string().required("Role is required").default("ADMIN"),
});
