export type getUserApiProps = {
  setLoading: (value: boolean) => void;
  setMessage: (value: string) => void;
};

export type getTransactionApiProps = {
  setLoading: (value: boolean) => void;
  type?: string;
};
