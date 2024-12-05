


import { axiosJWT } from "../utils/httpRequest";


const apiGetAllPostType= async () => {
    try {
      const response = await axiosJWT.get("post-type/all");
      return response.data;
    } catch (error) {
      return error;
    }
  };
  const apiUpdatePostType= async (ptid:string,data: any) => {
    try {
      const response = await axiosJWT.put(`post-type/${ptid}/update`,data);
      return response.data;
    } catch (error) {
      return error;
    }
  };
 
  const apiGetPostType= async (ptid:string ) => {
    try {
      const response = await axiosJWT.get(`post-type/${ptid}`);
      return response.data;
    } catch (error) {
      return error;
    }
  };

export {apiGetAllPostType,apiUpdatePostType,apiGetPostType};
