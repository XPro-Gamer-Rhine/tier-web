import { useAuth } from "@/lib/contexts/AuthContext";
import { useEffect, useState } from "react";
import useApi from "./useApi";
import {
  deleteUser,
  getUsersList,
  inviteUser,
  resendInvitation,
  revokeInvitation,
  updateUser,
} from "@/utils/api";

export const useUser = ({ userType = "" }) => {
  const { user } = useAuth();
  const [options, setOptions] = useState<any[]>([]);
  const [data, setData] = useState<any>(null);

  const get = async () => {
    const response = await getUsersList(user?.organization_id, userType);
    setData(response.data);
  };

  const post = async (data: any) => {
    const postData = {
      organizationId: user?.organization_id,
      firstName: data?.firstName,
      lastName: data?.lastName,
      email: data?.email,
      role: data?.role,
      course: data?.course,
      region: data?.region,
      school: data?.school,
      assigneeIds: data?.assigneeIds,
    };
    await inviteUser(data);
    get();
  };

  const update = async ({ userId, data }: any) => {
    await updateUser({ userId, data });
    get();
  };

  const remove = async ({ userId, email }: any) => {
    await deleteUser({ userId, email });
    get();
  };

  const revoke = async ({ organizationId, invitationId }: any) => {
    await revokeInvitation({ organizationId, invitationId });
    get();
  };

  const resend = async ({ organizationId, invitationId }: any) => {
    resendInvitation({
      organizationId: organizationId,
      invitationId: invitationId,
    });
    get();
  };

  useEffect(() => {
    if (data && data.length) {
      const userOptions = data.map((user: any) => ({
        value: user.id,
        label: `${user.firstName} ${user.lastName}`,
      }));
      const sortedOptions = userOptions.sort(
        (a: { label: string }, b: { label: any }) =>
          a.label.localeCompare(b.label)
      );
      setOptions(sortedOptions);
    }
  }, [data]);
  return {
    data,
    options,
    get,
    post,
    update,
    remove,
    revoke,
    resend,
  };
};
