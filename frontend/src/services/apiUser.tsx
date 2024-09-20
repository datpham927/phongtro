import { axiosJWT } from "../utils/httpRequest";

export const apiGetDetailUser = async () => {
    try {
      const response = await axiosJWT.get(`/user/detail`);
      return response.data;
    } catch (error) {
       console.log(error)

      return Promise.reject(error); // Re-throw error for better handling upstream
    }
  };
  
  export const apiUpdateProfile= async (data:any) => {
    try {
      const response = await axiosJWT.put(`/user/profile`,data);
      return response.data;
    } catch (error) {
       console.log(error)

      return Promise.reject(error); // Re-throw error for better handling upstream
    }
  };
  