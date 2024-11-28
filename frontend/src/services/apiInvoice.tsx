


import { axiosJWT } from "../utils/httpRequest";


const apiGetAllPaymentHistory = async (query:any) => {
    try {
      const response = await axiosJWT.get("invoice/all",{params:query});
      return response.data;
    } catch (error) {
      return error;
    }
  };

  
export {apiGetAllPaymentHistory};
