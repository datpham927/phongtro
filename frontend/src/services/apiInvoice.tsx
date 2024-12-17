


import { axiosJWT } from "../utils/httpRequest";


const apiGetAllPaymentHistory = async (query:any) => {
    try {
      const response = await axiosJWT.get("invoice/all-payment-history",{params:query});
      return response.data;
    } catch (error) {
      return error;
    }
  };

const apiGetAllDepositHistory = async (query:any) => {
    try {
      const response = await axiosJWT.get("invoice/all-deposit-history",{params:query});
      return response.data;
    } catch (error) {
      return error;
    }
  };

  const apiGetStatistical = async (query:any) => {
    try {
      const response = await axiosJWT.get("statistical/all",{params:query});
      return response.data;
    } catch (error) {
      return error;
    }
  };

export {apiGetAllPaymentHistory,apiGetAllDepositHistory,apiGetStatistical};
