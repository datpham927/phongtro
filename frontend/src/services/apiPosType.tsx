


import { axiosJWT } from "../utils/httpRequest";


const apiGetAllPostType= async () => {
    try {
      const response = await axiosJWT.get("post-type/all");
      return response.data;
    } catch (error) {
      return error;
    }
  };
 

export {apiGetAllPostType};
