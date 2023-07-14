import axios from "axios";
import { getAdminToken, getRefresh } from "@/common";
// import globalBaseUrl from './globalBaseUrl'
import API_URL from "@/config";
import jwt_decode from "jwt-decode";
const axiosClient = axios.create({
  baseURL: API_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

const refreshToken = async () => {
  const token = getAdminToken();
  const refresh = getRefresh();
  const axios2 = axios.create({
    baseURL: API_URL,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      // Authorization: `Bearer ${token}`,
    },
  });
  try {
    const res = await axios2.post("/auth/refresh", {
      refreshToken: refresh,
      accessToken: token,
    });
    // setUser({
    //     ...user,
    //     accessToken: res.data.accessToken,
    //     refreshToken: res.data.refreshToken,
    // });
    const response = res?.data?.data;
    // console.log(response, "here is response")
    localStorage.setItem("admintoken", response.accessToken);
    localStorage.setItem("refresh", response.refreshToken);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

axiosClient.interceptors.request.use(
  async (config) => {
    const token = getAdminToken();
    // const refresh = getRefresh();
    // let currentDate = new Date();
    if (token) {
      const decodedToken = jwt_decode<any>(token || "");

      if (Date.now() >= decodedToken.exp * 1000) {
        const res = await refreshToken();
        config.headers["authorization"] = "Bearer " + res.data.accessToken;
      } else {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    // console.log(token)
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosClient;
