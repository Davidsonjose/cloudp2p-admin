import apiClient from "@/helpers/apiClient";
import { replyAppealDto } from "@/interface/p2p";

export const getAllUserP2PTrades = async () => {
  return await apiClient.get(`/backend/p2p-trades`);
};
export const getAllUserP2POffers = async () => {
  return await apiClient.get(`/backend/p2p-offers`);
};

export const getDisputeMessages = async (tradeId: string | number) => {
  const messages = await apiClient.get(
    `/backend/p2p-trades/${tradeId}/dispute-messages`
  );
  return messages;
};

export const replyAppeal = async (info: replyAppealDto) => {
  //   console.log(tradeId);
  const appeal = await apiClient.post(
    `/backend/p2p-trades/${info.tradeDisputeId}/dispute-messages`,
    info
  );
  return appeal;
};

export const deactivateOffer = async (
  offerId: string | number,
  message: string
) => {
  const offer = await apiClient.put(
    `/backend/p2p-offers/deactivate/${offerId}`,
    { deactivationMessage: message }
  );
  return offer;
};

export const activateOffer = async (offerId: string | number) => {
  const offer = await apiClient.put(`/backend/p2p-offers/activate/${offerId}`);
};
