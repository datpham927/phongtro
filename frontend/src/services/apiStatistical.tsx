


import { axiosJWT } from "../utils/httpRequest";


const apiGetStatistical= async (query:any) => {
    try {
      const response = await axiosJWT.get("post-type/all",{
        params:query
      });
      return response.data;
    } catch (error) {
      return error;
    }
  };

export {apiGetStatistical};
