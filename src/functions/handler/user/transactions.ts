import { store } from "@/app/store";
import {
  setAllSendAndReceiveTransactions,
  setAllTransactions,
  setSwapTransactions,
  setTransferTransactions,
} from "@/features/auth/api/transactions";
import { setAllUsers } from "@/features/auth/api/users";
import { getTransactionApiProps } from "@/interface/user";
import {
  getAllUserTransactions,
  getSwapTrasactions,
  getTransactionAggs,
} from "@/services/backend/transactions.service";
import { getAllUser } from "@/services/backend/users.service";

export const getAllTransactions = async ({
  setLoading,
  type,
}: getTransactionApiProps) => {
  setLoading(true);
  try {
    if (type) {
      if (type == "SEND&RECEIVE") {
        const alltransactions = await getAllUserTransactions();
        const info = alltransactions?.data?.data;
        const sendandreceive = info.filter(
          (data: any) =>
            data?.type == "WITHDRAWAL" ||
            data?.type == "DEPOSIT" ||
            data?.type == "TRANSFER"
        );
        store.dispatch(setAllSendAndReceiveTransactions(sendandreceive));
        setLoading(false);
      } else if (type == "TRANSFER") {
        const alltransactions = await getAllUserTransactions(type);
        const info = alltransactions?.data?.data;
        store.dispatch(setTransferTransactions(info));
        setLoading(false);
      } else if (type == "SWAP") {
        const alltransactions = await getAllUserTransactions(type);
        const info = alltransactions?.data?.data;
        store.dispatch(setSwapTransactions(info));
        setLoading(false);
      }
    } else {
      const alltransactions = await getAllUserTransactions();
      store.dispatch(setAllUsers(alltransactions?.data?.data));
      setLoading(false);
    }
  } catch (error: any) {
    setLoading(false);
  }
};

export const getAllSwapTrasactions = async ({
  setLoading,
}: {
  setLoading: (state: boolean) => void;
}) => {
  try {
    const allswaptransaction = await getSwapTrasactions();
    store.dispatch(setSwapTransactions(allswaptransaction.data.data));
    setLoading(false);
  } catch (error) {}
};

export const getAllTransactionAgg = async () => {
  try {
    const transaction = await getTransactionAggs();
    console.log(transaction, "here is transaction");
    return transaction.data;
  } catch (error) {
    console.log(error, "here is error");
  }
};
