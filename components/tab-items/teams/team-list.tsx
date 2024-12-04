import { ContentBox } from "@/components/content-box";
import DataTable from "@/components/data-table";
import ActionsDropdown from "@/components/data-table/actions-dropdown";
import { TableSkeleton } from "@/components/data-table/table-skeleton";
import DeleteDialog from "@/components/delete-dialog";
import useApi from "@/hooks/useApi";
import { useTableSearch } from "@/hooks/useTableSearch";
import { useAuth } from "@/lib/contexts/AuthContext";
import { useConvoDashboardStore } from "@/store/useConvoDashboardStore";
import { deleteConvoTeam, getConvoTeam } from "@/utils/api";
import { getOriginalZonedDate } from "@/utils/date";
import { Check, Edit, PersonOff, Search } from "@mui/icons-material";
import {
  Button,
  Chip,
  FormControl,
  InputAdornment,
  OutlinedInput,
  Stack,
} from "@mui/material";

import { useEffect } from "react";
import TeamEditDialog from "./team-edit-dialog";

interface Team {
  _id: string;
  name: string;
  createdAt: string;
  totalReps: number;
  totalAICalls: number;
  totalCustomerCalls: number;
  status: string;
}

const teamListTableColumns = [
  { id: "name", label: "Team Name" },
  { id: "createdAt", label: "Created On" },
  { id: "totalReps", label: "Members" },
  { id: "totalAICalls", label: "AI Calls" },
  { id: "totalCustomerCalls", label: "Customer Calls" },
  { id: "status", label: "status" },
  { id: "actions", label: "Actions" },
];

const TeamList: React.FC = () => {
  const { user } = useAuth();
  const teamList = useConvoDashboardStore((state) => state.teamList);
  const setTeamList = useConvoDashboardStore((state) => state.setTeamList);

  const changeEditDialogState = useConvoDashboardStore(
    (state) => state.setEditDialog
  );
  const changeDeleteDialogState = useConvoDashboardStore(
    (state) => state.setDeleteDialog
  );

  const {
    results: data,
    call: fetchUsers,
    loading,
  } = useApi({
    fetchers: [getConvoTeam],
    onSuccess: (updatedData) => setTeamList(updatedData),
  });

  const { call: deleteTeam } = useApi({
    fetchers: [deleteConvoTeam],
    onSuccess: (response: any) => {
      const updatedTeamList = teamList.filter(
        (team) => team._id !== response._id
      );
      setTeamList(updatedTeamList);
    },
  });

  const searchFields = ["name", "status"];

  const { searchTerm, setSearchTerm, filteredData } = useTableSearch({
    data: teamList,
    searchFields,
    dateRangeColumn: "createdAt",
  });

  useEffect(() => {
    fetchUsers(user?.organization_id);
  }, []);

  const actions = (data: Team) => {
    return [
      {
        label: "View/Edit Details",
        icon: <Edit color="success" />,
        onClick: () =>
          changeEditDialogState({
            isOpen: true,
            forItem: "team",
            data,
            onOk: function (): void {
              throw new Error("Function not implemented.");
            },
          }),
      },
      {
        label: "Remove Team",
        icon: <PersonOff color="error" />,
        onClick: () =>
          changeDeleteDialogState({
            isOpen: true,
            forItem: "team",
            onOk: () => deleteTeam({ teamId: data._id }),
          }),
      },
    ];
  };

  const teamSearchBar = (
    <Stack direction="row" spacing={1}>
      <FormControl size="small">
        <OutlinedInput
          id="outlined-adornment-amount"
          placeholder="Search"
          onChange={(e) => setSearchTerm(e.target.value)}
          startAdornment={
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          }
        />
      </FormControl>
    </Stack>
  );

  return (
    <ContentBox>
      <Stack direction="column" spacing={5}>
        <Stack direction="row" sx={{ justifyContent: "space-between" }}>
          <Button
            variant="contained"
            color="success"
            startIcon={<Check />}
            type="submit"
            onClick={() => {
              changeEditDialogState({
                isOpen: true,
                forItem: "team",
                data: {},
                onOk: function (): void {
                  throw new Error("Function not implemented.");
                },
              });
            }}
          >
            Create Team
          </Button>
          {teamSearchBar}
        </Stack>
        {loading ? (
          <TableSkeleton column={teamListTableColumns} />
        ) : (
          <DataTable
            columns={teamListTableColumns}
            sort={true}
            data={filteredData?.map((item) => ({
              ...item,
              actions: <ActionsDropdown actions={actions(item)} />,
              createdAt: getOriginalZonedDate({
                date: item.createdAt,
              }),
              status: (
                <Chip
                  label={item.status}
                  variant="outlined"
                  size="small"
                  color={item.status === "ACTIVE" ? "success" : "info"}
                />
              ),
            }))}
          />
        )}
      </Stack>
      <DeleteDialog />
      <TeamEditDialog
        dialogState={{
          isOpen: false,
          dialogMode: "edit",
          data: undefined,
          forItem: "",
        }}
        changeDialogState={function (state: any): void {
          throw new Error("Function not implemented.");
        }}
      />
    </ContentBox>
  );
};

export default TeamList;
