export type replyAppealMessageDataProps = {
  setLoading: (loading: boolean) => void;
  setMessage?: (message: string) => void;
  data: {
    disputeMessage: string;
    tradeDisputeId: string;
    resolution: ResolutionType;
  };
  setError: (error: string) => void;
};

export type replyAppealDto = {
  disputeMessage: string;
  tradeDisputeId: string;
  resolution: ResolutionType;
};
export enum ResolutionType {
  IN_PROGRESS = "IN_PROGRESS",
  CANCEL = "CANCEL",
  COMPLETE = "COMPLETE",
}
