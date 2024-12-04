import baseApi from "@/config/axios-config";

export const loginUser = async (data: any) => {
  console.log(data);
  try {
    const response = await baseApi.post("/organization/user/login", data);
    return response;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getOrganizationDetails = async (org: string | undefined) => {
  try {
    const response = await baseApi.get(`/organizationMeta/${org}`);
    return response;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const userDetails = async () => {
  try {
    const response = await baseApi.get("/organization/me");
    return response;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getNotificationCount = async () => {
  try {
    const response = await baseApi.get("/planningPartnerNotification");
    const notifications = response.data;
    const sentCount = notifications.filter(
      (notification: any) => notification.status.toLowerCase() === "sent"
    ).length;

    return sentCount;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getOrganizationMeta = async (organizationName: string) => {
  try {
    const response = await baseApi.get(
      `/organizationMeta/organizationMetaDetails/${organizationName}`
    );
    return response;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getUsersList = async (organizationId: any, role: any) => {
  if (role) {
    const response = await baseApi.get(
      `/organization/users/${organizationId}?role=${role}`,
      {}
    );
    return response;
  }
  const response = await baseApi.get(`/organization/users/${organizationId}`);
  return response;
};

export const deleteUser = async (data: any) => {
  const response = await baseApi.post(`/organization/user/delete`, data);
  return response;
};

export const inviteUser = async (data: any) => {
  const response = await baseApi.post(`/organization/invitation`, data);

  return response;
};

export const updateUser = async ({ userId, organizationId, data }: any) => {
  const response = await baseApi.post(
    `/organization/user/update/${userId}`,
    data,
    {
      headers: {
        organizationId,
      },
    }
  );

  return response;
};

export const revokeInvitation = async (data: any) => {
  const response = await baseApi.post(`/organization/invitation/revoke`, data);

  return response;
};

export const resendInvitation = async (data: any) => {
  const response = await baseApi.post(`/organization/invitation/resend`, data);

  return response;
};

export const postConvoTeam = async (data: any) => {
  const response = await baseApi.post("/convoTeam", data);
  return response;
};

export const updateConvoTeam = async ({ data, teamId }: any) => {
  const response = await baseApi.put(`/convoTeam/${teamId}`, data);
  return response;
};

export const getAllPersonas = async () => {
  const response = await baseApi.get(`/convoPersona`);

  return response;
};

export const getConvoTeam = async (organizationId: string, userType: any) => {
  const query = userType ? `?type=${userType}&` : "";
  const response = await baseApi.get(`/convoTeam/${organizationId}${query}`);
  return response;
};

export const deleteConvoTeam = async ({ teamId }: any) => {
  const response = await baseApi.delete(`/convoTeam/${teamId}`);
  return response;
};
