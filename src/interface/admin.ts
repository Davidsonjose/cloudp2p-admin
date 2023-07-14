export type addAdminUserPropsData = {
  email: string;
  pwd: string;
  role: string;
  lastName: string;
  firstName: string;
};

export type addAdminApiPropsData = {
  setLoading: (loading: boolean) => void;
  setMessage: (message: string) => void;
  data: {
    email: string;
    pwd: string;
    role: string;
    lastName: string;
    firstName: string;
  };
  setError: (error: string) => void;
};
