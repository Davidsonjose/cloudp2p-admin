import apiClient from "@/helpers/apiClient";
import { TrasanctionType } from "@/interface/transactions";

export const getAllUserTransactions = async (type?: TrasanctionType) => {
  if (type) {
    return await apiClient.get(`/backend/transactions?type=${type}`);
  } else {
    return await apiClient.get(`/backend/transactions`);
  }
};

export const getSwapTrasactions = async () => {
  return await apiClient.get(`/backend/swap`);
};
