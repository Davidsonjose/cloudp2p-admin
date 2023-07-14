import { store } from "@/app/store";
import { setAllAdminUsers, setAllUsers } from "@/features/auth/api/users";
import { addAdminApiPropsData } from "@/interface/admin";
import { getUserApiProps } from "@/interface/user";
import {
  addAdminUser,
  getAllAdminUser,
} from "@/services/backend/admin.service";

export const addNewAdminUser = async ({
  data,
  setLoading,
  setMessage,
  setError,
}: addAdminApiPropsData) => {
  setLoading(true);
  setMessage("");
  try {
    const addresponse = await addAdminUser(data);
    getAdminUsers({ setLoading, setMessage });
    setMessage("User added successfully");
    setLoading(false);

    setTimeout(() => {
      window.location.reload();
    }, 1300);
    // return allusers.data?.data;
  } catch (error: any) {
    setLoading(false);
    setError(error?.response?.data?.message[0]);
  }
};

export const getAdminUsers = async ({
  setLoading,
  setMessage,
}: getUserApiProps) => {
  setLoading(true);
  //   setMessage("");
  try {
    const allusers = await getAllAdminUser();
    store.dispatch(setAllAdminUsers(allusers?.data?.data));
    setLoading(false);
    // return allusers.data?.data;
  } catch (error: any) {
    setLoading(false);
  }
};
