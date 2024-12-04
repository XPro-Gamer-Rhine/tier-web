import EditDialogWrapper from "@/components/edit-dialog";
import FormField from "@/components/form-field";
import useApi from "@/hooks/useApi";
import { useUser } from "@/hooks/useUser";
import { useAuth } from "@/lib/contexts/AuthContext";
import { addTeam } from "@/lib/schema";
import { useConvoDashboardStore } from "@/store/useConvoDashboardStore";
import { getAllPersonas, postConvoTeam, updateConvoTeam } from "@/utils/api";
import { cleanObject } from "@/utils/clean-object";
import { createSortedSelectOptions } from "@/utils/sort-array";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import AvatarSelector from "@/components/avatar-selector";

interface Field {
  name: string;
  label: string;
  type: "text" | "select" | "multiSelect";
  options?: { value: string; label: string }[];
  multiline?: boolean;
}

interface TeamInfo {
  name: string;
  description: string;
  assignedReps: string[];
  assignedPersonas: string[];
  role?: string;
}

interface DummyTeamInfo {
  totalReps: number;
  totalAICalls: number;
  totalCustomerCalls: number;
  status: string;
}

interface TeamEditDialogProps {
  dialogState: {
    isOpen: boolean;
    dialogMode: "edit" | "add";
    data?: TeamInfo & { _id?: string; avatar?: string };
    forItem: string;
  };
  changeDialogState: (state: any) => void;
}

const blankTeamInfo: TeamInfo = {
  name: "",
  description: "",
  assignedReps: [],
  assignedPersonas: [],
};

const dummyTeamInfo: DummyTeamInfo = {
  totalReps: 0,
  totalAICalls: 0,
  totalCustomerCalls: 0,
  status: "ACTIVE",
};

const TeamEditDialog: React.FC<TeamEditDialogProps> = ({
  dialogState,
  changeDialogState,
}) => {
  const [teamInfo, setTeamInfo] = useState<TeamInfo>(blankTeamInfo);
  const { user } = useAuth();

  const setTeamList = useConvoDashboardStore((state) => state.setTeamList);
  const teamList = useConvoDashboardStore((state) => state.teamList);
  const updateTeamItem = useConvoDashboardStore(
    (state) => state.updateTeamItem
  );
  const { data } = dialogState;

  const { call: createTeam } = useApi({
    fetchers: [postConvoTeam],
    onSuccess: (response) => {
      setTeamList([{ ...response, ...dummyTeamInfo }, ...teamList]);
      setTeamInfo(blankTeamInfo);
      changeDialogState({ isOpen: false, forItem: "team" });
    },
  });

  const { call: updateTeam } = useApi({
    fetchers: [updateConvoTeam],
    onSuccess: (response: any) => {
      updateTeamItem(response);
      setTeamInfo(blankTeamInfo);
      changeDialogState({ isOpen: false, forItem: "team" });
    },
  });

  const { data: SRList, get: fetchAllSR } = useUser({ userType: "SALES_REP" });

  const { results: personaList, call: fetchAllPersonas } = useApi({
    fetchers: [getAllPersonas],
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
    trigger,
  } = useForm<any>({
    resolver: yupResolver(addTeam),
    mode: "onChange",
    defaultValues: {
      name: "",
      description: "",
      assignedReps: [],
      assignedPersonas: [],
      role: "ADMIN",
    },
  });

  const mapAssignedData = (
    updatedInfo: TeamInfo,
    SRList: any[],
    personaList: any[],
    avatar: string | undefined
  ) => {
    return {
      ...cleanObject({ ...updatedInfo, avatar }),
      assignedReps: updatedInfo.assignedReps
        .map((id) => {
          const sr = SRList?.find((item) => item.id === id);
          return sr
            ? { id: sr.id, name: `${sr.firstName} ${sr.lastName}` }
            : null;
        })
        .filter(Boolean),
      assignedPersonas: updatedInfo.assignedPersonas
        .map((id) => {
          const persona = personaList?.find((item) => item._id === id);
          return persona ? { id: persona._id, name: persona.name } : null;
        })
        .filter(Boolean),
    };
  };

  const postTeamInfo: SubmitHandler<TeamInfo> = (updatedInfo) => {
    const mappedData = mapAssignedData(
      updatedInfo,
      SRList,
      personaList,
      dialogState.data?.avatar
    );
    createTeam({ ...mappedData, organizationId: user?.organization_id });
    reset();
  };

  const updateTeamInfo: SubmitHandler<TeamInfo> = async (updatedInfo) => {
    if (!dialogState.data) return;
    const mappedData = mapAssignedData(
      updatedInfo,
      SRList,
      personaList,
      dialogState.data.avatar
    );
    await updateTeam({ data: mappedData, teamId: data?._id });
  };

  useEffect(() => {
    const selectedSRIds = data?.assignedReps?.map((item: any) => item.id);
    const selectedPersonaIds = data?.assignedPersonas?.map(
      (item: any) => item.id
    );
    const initialTeamInfo: TeamInfo = {
      name: data?.name || "",
      description: data?.description || "",
      assignedReps: selectedSRIds || [],
      assignedPersonas: selectedPersonaIds || [],
    };
    reset(initialTeamInfo);
    setTeamInfo(initialTeamInfo);
  }, [data, reset]);

  useEffect(() => {
    fetchAllSR();
    fetchAllPersonas();
  }, []);

  const renderFormFields = () => {
    const fields: Field[] = [
      { name: "name", label: "Team Name", type: "text" },
      {
        name: "description",
        label: "Description",
        type: "text",
        multiline: true,
      },
      {
        name: "assignedReps",
        label: "Sales Representatives",
        type: "multiSelect",
        options: createSortedSelectOptions(SRList ?? [], "id", [
          "firstName",
          "lastName",
        ]),
      },
      {
        name: "assignedPersonas",
        label: "Assigned Personas",
        type: "multiSelect",
        options: createSortedSelectOptions(personaList ?? [], "_id", "name"),
      },
    ];

    return fields.map((item) => (
      <FormField
        key={item.name}
        field={item}
        register={register}
        errors={errors}
        watch={watch}
        state={teamInfo}
        stateUpdater={setTeamInfo}
        hookFormUpdater={setValue}
        hookFormTrigger={trigger}
        loading={false} // Add this prop
      />
    ));
  };

  return (
    <EditDialogWrapper
      onSubmit={handleSubmit(
        dialogState.dialogMode === "edit" ? updateTeamInfo : postTeamInfo
      )}
      dialogType="edit"
      title={
        dialogState.dialogMode === "edit" ? "Update Team Info" : "Add Team"
      }
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <AvatarSelector />
        {renderFormFields()}
      </Box>
    </EditDialogWrapper>
  );
};

export default TeamEditDialog;
