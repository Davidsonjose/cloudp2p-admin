import { store } from "@/app/store";
import { setAllUsers } from "@/features/auth/api/users";
import { getUserApiProps } from "@/interface/user";
import {
  activateUserApi,
  deactivateUserApi,
  getActiveUserAgg,
  getAllUser,
} from "@/services/backend/users.service";

export const getAllUsers = async ({
  setLoading,
  setMessage,
}: getUserApiProps) => {
  setLoading(true);
  setMessage("");
  try {
    const allusers = await getAllUser();
    setLoading(false);
    store.dispatch(setAllUsers(allusers?.data?.data));
    setLoading(false);
    // return allusers.data?.data;
  } catch (error: any) {
    console.log(error);
    setLoading(false);
  }
};
// export const getAllUsersToday = async ({
//   setLoading,
//   setMessage,
// }: getUserApiProps) => {
//   setLoading(true);
//   setMessage("");
//   try {
//     const allusers = await getAllUser();
//     setLoading(false);
//     const users = allusers.data.data;
//     store.dispatch(setAllUsers(allusers?.data?.data));
//     setLoading(false);
//     // return allusers.data?.data;
//   } catch (error: any) {
//     console.log(error);
//     setLoading(false);
//   }
// };

export const deactivateUser = async ({
  setLoading,
  userId,
  setError,
  setMessage,
  reason,
}: {
  setLoading: (type: boolean) => void;
  userId: number;
  setMessage: (type: string) => void;
  setError: (type: string) => void;
  reason: string;
}) => {
  setLoading(true);
  try {
    const deactivate_response = await deactivateUserApi(userId, reason);
    setLoading(false);
    setMessage("User has been deactivated succesfully");
  } catch (error) {
    console.log(error);
    setLoading(false);
  }
};

export const activateUser = async ({
  setLoading,
  userId,
  setError,
  setMessage,
}: {
  setLoading: (type: boolean) => void;
  userId: number;
  setMessage: (type: string) => void;
  setError: (type: string) => void;
}) => {
  setLoading(true);
  try {
    const activate_response = await activateUserApi(userId);
    setLoading(false);
    setMessage("User has been activated successfully");
  } catch (error) {
    console.log(error);
    setLoading(false);
  }
};

export const getActiveAgg = async () => {
  try {
    const users = await getActiveUserAgg();
    return users.data.data;
  } catch (error) {
    console.log(error);
  }
};
