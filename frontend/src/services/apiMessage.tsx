import { axiosJWT } from "../utils/httpRequest";
 
export const apiAddMessage = async (conversationId:string,message:string) => {
  try {
    const response = await axiosJWT.post(`/message/${conversationId}/add`,{message});
    return response.data;
  } catch (error: any) {
    console.error("Error fetching conversations:", error);
    return error;
  }
};
export const apiGetMessages = async (conversationId:string) => {
  try {
    const response = await axiosJWT.get(`/message/${conversationId}/all`);
    return response.data;
  } catch (error: any) {
    console.error("Error fetching conversations:", error);
    return error;
  }
};
