import { axiosJWT, httpRequest } from "../utils/httpRequest";
 
const apiGetPost = async ( query: any): Promise<any> => {
  try {
    const response = await httpRequest.get(`/post/all`, { params:query});
    return response.data;
  } catch (error) {
    return Promise.reject(error); // Re-throw error for better handling upstream
  }
};
const apiGetPostForShop = async ( query: any): Promise<any> => {
  try {
    const response = await axiosJWT.get(`/post/shop`, { params:query});
    return response.data;
  } catch (error) {
    return Promise.reject(error); // Re-throw error for better handling upstream
  }
};
const apiCreatePost = async (content: any): Promise<any> => {
  try {
    const response = await axiosJWT.post(`/post/add`, content);
    return response.data;
  } catch (error) {
    return Promise.reject(error); // Re-throw error for better handling upstream
  }
};

// const apiGetPostAdmin = async (): Promise<any> => {
//   try {
//     const response = await httpRequest.get(`/post/admin-post`);
//     return response.data;
//   } catch (error) {
//     return Promise.reject(error); // Re-throw error for better handling upstream
//   }
// };

const apiUpdatePost = async (pid:string,data: any): Promise<any> => {
  try {
    const response = await axiosJWT.put(`/post/${pid}/update`, data);
    return response.data;
  } catch (error) {
    return Promise.reject(error); // Re-throw error for better handling upstream
  }
};

// const apiDeletePost = async (postId: string): Promise<any> => {
//   try {
//     const response = await httpRequest.delete(`/post/delete-post`, {
//       params: { postId },
//     });
//     return response.data;
//   } catch (error) {
//     return Promise.reject(error); // Re-throw error for better handling upstream
//   }
// };

const getDetailPost = async (postId: any): Promise<any> => {
  try {
    const response = await httpRequest.get(`/post/${postId}/detail`);
    return response.data;
  } catch (error) {
    return Promise.reject(error); // Re-throw error for better handling upstream
  }
};
const getRelatedPosts = async (addressId: any): Promise<any> => {
  try {
    const response = await httpRequest.get(`/post/${addressId}/related-post`);
    return response.data;
  } catch (error) {
    return Promise.reject(error); // Re-throw error for better handling upstream
  }
};
export { apiGetPost,getDetailPost,getRelatedPosts,apiCreatePost,apiGetPostForShop,
  apiUpdatePost
  // , apiNewPost, apiCreatePost, apiapiGetPostAdmin, apiUpdatePost, apiDeletePost, apiDetailPost 
};
