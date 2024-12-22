import { axiosJWT } from "../utils/httpRequest";

export const apiGetDetailUser = async (uid:string) => {
    try {
      const response = await axiosJWT.get(`/user/${uid}/detail`);
      return response.data;
    } catch (error) {
       console.log(error)

   return error;
    }
  };
  export const apiGetAllUser = async (query:any) => {
    try {
      const response = await axiosJWT.get(`/user/all-user`,{params:query});
      return response.data;
    } catch (error) {
       console.log(error)
   return error;
    }
  }; 

  export const apiCreateUser = async (data:any) => {
    try {
      const response = await axiosJWT.post(`/user/add`,data);
      return response.data;
    } catch (error) {
       console.log(error)
   return error;
    }
  }; 
  
  export const apiUpdateProfile= async (data:any) => {
    try {
      const response = await axiosJWT.put(`/user/profile`,data);
      return response.data;
    } catch (error) {
       console.log(error)
   return error;
    }
  };
  export const apiUpdateUser= async (data:any,uid:any) => {
    try {
      const response = await axiosJWT.put(`/user/${uid}/update`,data);
      return response.data;
    } catch (error) {
       console.log(error)
   return error;
    }
  };
  export const apiDeleteUser= async (uid:any) => {
    try {
      const response = await axiosJWT.delete(`/user/${uid}/delete`);
      return response.data;
    } catch (error) {
       console.log(error)
   return error;
    }
  };
  
  export const apiDeposit= async (amount:number) => {
    try {
      const response = await axiosJWT.put(`/user/deposit`,{ amount });
      return response.data;
    } catch (error) {
       console.log(error)
   return error;
    }
  };