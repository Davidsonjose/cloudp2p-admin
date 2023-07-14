import apiClient from "@/helpers/apiClient";

export const getAllUser = async () => {
  return await apiClient.get(`/backend/user`);
};

export const getSingleUser = async (userid: number) => {
  return await apiClient.get(`/backend/user${userid}`);
};

export const getRecentLoggedInUsers = async () => {
  return await apiClient.get(`/backend/user/recent-loggedin`);
};
export const getRecentCreatedUsers = async () => {
  return await apiClient.get(`/backend/user/recent-created`);
};

export const deactivateUserApi = async (userId: number, message: string) => {
  console.log(userId);
  const offer = await apiClient.put(`/backend/user/deactivate/${userId}`, {
    deactivationMessage: message,
  });
  return offer;
};

export const activateUserApi = async (userId: number) => {
  const offer = await apiClient.put(`/backend/user/activate/${userId}`);
  return offer;
};

export const getActiveUserAgg = async () => {
  return await apiClient.get(`/backend/user/agg-active-users`);
};
