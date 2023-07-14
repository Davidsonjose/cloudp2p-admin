import apiClient from "@/helpers/apiClient";
import { addAdminUserPropsData } from "@/interface/admin";

export const addAdminUser = async (data: addAdminUserPropsData) => {
  return await apiClient.post(`/admin-user`, data);
};

export const getAllAdminUser = async () => {
  return await apiClient.get(`/admin-user`);
};
