import { axiosJWT } from "../utils/httpRequest";
 

export const apiAddConversation = async (receiverId: any) => {
  try {
    const response = await axiosJWT.post(`/conversation/add`, {
      receiver_id: receiverId, 
    });
    return response.data;
  } catch (error: any) {
    console.error("Error fetching conversations:", error);
    return error;
  }
};
export const apiGetConversations = async () => {
  try {
    const response = await axiosJWT.get(`/conversation/all`);
    return response.data;
  } catch (error: any) {
    console.error("Error fetching conversations:", error);
    return error;
  }
};
