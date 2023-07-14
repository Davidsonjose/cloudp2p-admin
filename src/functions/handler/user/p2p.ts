import { store } from "@/app/store";
import { setAllP2POffers, setAllP2PTrades } from "@/features/auth/api/p2p";
import { replyAppealMessageDataProps } from "@/interface/p2p";
import {
  activateOffer,
  deactivateOffer,
  getAllUserP2POffers,
  getAllUserP2PTrades,
  replyAppeal,
} from "@/services/backend/p2p.service";

export const getAllP2PTrade = async ({
  setLoading,
}: {
  setLoading: (loading: boolean) => void;
}) => {
  try {
    setLoading(true);
    const response = await getAllUserP2PTrades();
    // console.log(response);
    store.dispatch(setAllP2PTrades(response.data));
    // console.log(response?.data);
    setLoading(false);
  } catch (error) {
    setLoading(false);
    console.log(error);
  }
};
export const getAllP2POffer = async ({
  setLoading,
}: {
  setLoading: (loading: boolean) => void;
}) => {
  try {
    setLoading(true);
    const response = await getAllUserP2POffers();
    // console.log(response);
    store.dispatch(setAllP2POffers(response.data));
    // console.log(response?.data);
    setLoading(false);
  } catch (error) {
    setLoading(false);
    console.log(error);
  }
};
export const replyAppealMessage = async ({
  data,
  setLoading,
  setMessage,
  setError,
}: replyAppealMessageDataProps) => {
  setLoading(true);
  // setMessage("");
  try {
    const addresponse = await replyAppeal(data);
    console.log(addresponse);
    setLoading(false);
  } catch (error: any) {
    setLoading(false);
    setError(error?.response?.data?.message[0]);
  }
};

export const deactivateMerchantOffer = async ({
  setLoading,
  offerId,
  setError,
  setMessage,
  reason,
}: {
  setLoading: (type: boolean) => void;
  offerId: string | number;
  setMessage: (type: string) => void;
  setError: (type: string) => void;
  reason: string;
}) => {
  setLoading(true);
  try {
    const deactivate_response = await deactivateOffer(offerId, reason);
    setLoading(false);
    setMessage("Offer has been deactivated succesfully");
  } catch (error) {
    console.log(error);
    setLoading(false);
  }
};

export const activateMerchantOffer = async ({
  setLoading,
  offerId,
  setError,
  setMessage,
}: {
  setLoading: (type: boolean) => void;
  offerId: string | number;
  setMessage: (type: string) => void;
  setError: (type: string) => void;
}) => {
  setLoading(true);
  try {
    const activate_response = await activateOffer(offerId);
    setLoading(false);
    setMessage("Offer has been activated successfully");
  } catch (error) {
    console.log(error);
    setLoading(false);
  }
};
