import { axiosInstance } from "../axios";

export const fetchTokens = async () => {
    return axiosInstance
    .post("api/token/",{
      username:process.env.username,
      password:process.env.password
    })
  };