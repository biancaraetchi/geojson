import { axiosInstance } from "../axios";

export const fetchTokens = async () => {
    return axiosInstance
    .post("api/token/",{
      username:process.env.username,
      password:process.env.password
    })
  };

  export const fetchRefresh = async (refresh) => {
    return axiosInstance
    .post("api/token/refresh/",{
      refresh
    })
  };