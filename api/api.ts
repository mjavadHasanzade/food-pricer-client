import Axios from "axios";

export const getAxiosInstanse = () => {
  return Axios.create({
    //send configs

    baseURL: process.env.NEXT_PUBLIC_API_URL,
  });
};
