// import React, { useEffect, useState } from "react";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { Box } from "@mui/material";
// import apis from "api/api";
// import LoadingOverlay from "components/LoadingOverlay";
// import { useLoggedUser } from "contexts/UserContext";
// import { useApi } from "hooks";
// import { useUser } from "pages/Settings/context";
// import { FormField, FormFieldProps } from "pages/Settings/Tabs/common";
// import { useForm, UseFormReturn } from "react-hook-form";
// import { useConvoDashboardStore } from "store";
// import { cleanObject, createSortedSelectOptions } from "utils";
// import EditDialogWrapper from "../common/EditDialogWrapper";
// import { addTeam } from "../common/schema";
// import { AvatarSelector } from "./AvatarSelector";

// interface TeamInfo {
//   name: string;
//   description: string;
//   assignedReps: string[];
//   assignedPersonas: string[];
// }

// interface DialogState {
//   isOpen: boolean;
//   data: TeamInfo & { avatar?: string; _id?: string };
//   dialogMode: "edit" | "add";
// }

// const blankTeamInfo: TeamInfo = {
//   name: "",
//   description: "",
//   assignedReps: [],
//   assignedPersonas: [],
// };

// const dummyTeamInfo = {
//   totalReps: 0,
//   totalAICalls: 0,
//   totalCustomerCalls: 0,
//   status: "ACTIVE",
// };

// const TeamEditDialog: React.FC = () => {
//   const [teamInfo, setTeamInfo] = useState<TeamInfo>(blankTeamInfo);
//   const { user } = useLoggedUser();
  
//   const setTeamList = useConvoDashboardStore((state) => state.setTeamList);
//   const teamList = useConvoDashboardStore((state) => state.teamList);
//   const updateTeamItem = useConvoDashboardStore(
//     (state) => state.updateTeamItem
//   );
//   const dialogState = useConvoDashboardStore(
//     (state) => state.editDialog
//   ) as DialogState;
//   const changeDialogState = useConvoDashboardStore(
//     (state) => state.setEditDialog
//   );

//   const { call: createTeam, isLoading: teamCreating } = useApi({
//     fetcher: apis.postConvoTeam,
//     successMessage: "Team added successfully",
//     onSuccess: (response: any) => {
//       setTeamList([{ ...response, ...dummyTeamInfo }, ...teamList]);
//       setTeamInfo(blankTeamInfo);
//       changeDialogState({ isOpen: false, forItem: "team" });
//     },
//   });

//   const { call: updateTeam } = useApi({
//     fetcher: apis.updateConvoTeam,
//     successMessage: "Team info updated successfully",
//     onSuccess: (response: any) => {
//       updateTeamItem(response);
//       setTeamInfo(blankTeamInfo);
//       changeDialogState({ isOpen: false, forItem: "team" });
//     },
//   });

//   const {
//     data: SRList,
//     get: fetchAllSR,
//     isFetching: srLoading,
//   } = useUser({ userType: "SALES_REP" });

//   const {
//     data: personaList,
//     call: fetchAllPersonas,
//     isFetching: personasLoading,
//   } = useApi({ fetcher: apis.getAllPersonas });

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//     watch,
//     setValue,
//     trigger,
//   } = useForm<TeamInfo>({
//     resolver: yupResolver(addTeam),
//     mode: "onChange",
//     defaultValues: { name: "", description: "", assignedReps: [], assignedPersonas: [] },
//   });

//   const mapAssignedData = (
//     updatedInfo: TeamInfo,
//     SRList: any[],
//     personaList: any[],
//     avatar?: string
//   ) => {
//     return {
//       ...cleanObject({ ...updatedInfo, avatar }),
//       assignedReps: updatedInfo.assignedReps
//         .map((id) => {
//           const sr = SRList?.find((item) => item.id === id);
//           return sr
//             ? { id: sr.id, name: `${sr.firstName} ${sr.lastName}` }
//             : null;
//         })
//         .filter(Boolean),
//       assignedPersonas: updatedInfo.assignedPersonas
//         .map((id) => {
//           const persona = personaList?.find((item) => item._id === id);
//           return persona ? { id: persona._id, name: persona.name } : null;
//         })
//         .filter(Boolean),
//     };
//   };

//   const postTeamInfo = (updatedInfo: TeamInfo) => {
//     const mappedData = mapAssignedData(
//       updatedInfo,
//       SRList ?? [],
//       personaList ?? [],
//       dialogState.data?.avatar
//     );
//     createTeam({ ...mappedData, organizationId: user.organization });
//     reset();
//   };

//   const updateTeamInfo = async (updatedInfo: TeamInfo) => {
//     if (!dialogState.data) return;

//     const mappedData = mapAssignedData(
//       updatedInfo,
//       SRList ?? [],
//       personaList ?? [],
//       dialogState.data.avatar
//     );

//     await updateTeam({ data: mappedData, teamId: dialogState.data._id! });
//   };

//   useEffect(() => {
//     const selectedSRIds = dialogState.data?.assignedReps?.map((item) => item.id);
//     const selectedPersonaIds = dialogState.data?.assignedPersonas?.map((item) => item.id);
//     const initialTeamInfo: TeamInfo = {
//       name: dialogState.data?.name || "",
//       description: dialogState.data?.description || "",
//       assignedReps: selectedSRIds || [],
//       assignedPersonas: selectedPersonaIds || [],
//     };
//     reset(initialTeamInfo);
//     setTeamInfo(initialTeamInfo);
//   }, [dialogState.data, reset]);

//   useEffect(() => {
//     fetchAllSR();
//     fetchAllPersonas();
//   }, []);

//   const renderFormFields = () => {
//     const fields: FormFieldProps[] = [
//       { name: "name", label: "Team Name", type: "text" },
//       {
//         name: "description",
//         label: "Description",
//         type: "text",
//         multiline: true,
//       },
//       {
//         name: "assignedReps",
//         label: "Sales Representatives",
//         type: "multiSelect",
//         options: createSortedSelectOptions(SRList ?? [], "id", [
//           "firstName",
//           "lastName",
//         ]),
//       },
//       {
//         name: "assignedPersonas",
//         label: "Assigned Personas",
//         type: "multiSelect",
//         options: createSortedSelectOptions(personaList ?? [], "_id", "name"),
//       },
//     ];

//     return fields.map((item) => (
//       <FormField
//         loading={srLoading || personasLoading}
//         key={item.name}
//         field={item}
//         register={register}
//         errors={errors}
//         watch={watch}
//         state={teamInfo}
//         stateUpdater={setTeamInfo}
//         hookFormUpdater={setValue}
//         hookFormTrigger={trigger}
//       />
//     ));
//   };

//   return (
//     <>
//       {srLoading ? (
//         <LoadingOverlay />
//       ) : (
//         <EditDialogWrapper
//           onSubmit={handleSubmit(
//             dialogState.dialogMode === "edit" ? updateTeamInfo : postTeamInfo
//           )}
//           dialogType={"edit"}
//           title={
//             dialogState.dialogMode === "edit" ? "Update Team Info" : "Add Team"
//           }
//         >
//           <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
//             <AvatarSelector />
//             {renderFormFields()}
//           </Box>
//         </EditDialogWrapper>
//       )}
//     </>
//   );
// };

// export default TeamEditDialog;
