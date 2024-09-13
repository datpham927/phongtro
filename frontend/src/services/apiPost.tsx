import { axiosJWT, httpRequest } from "../utils/httpRequest";

 

// interface PostContent {
//   // Define the structure of the post content object
//   // Example:
//   title: string;
//   description: string;
//   [key: string]: any;
// }

const apiGetPost = async ( query: any): Promise<any> => {
  try {
    const response = await httpRequest.get(`/post/all`, { params:query});
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

// const apiapiGetPostAdmin = async (): Promise<any> => {
//   try {
//     const response = await httpRequest.get(`/post/admin-post`);
//     return response.data;
//   } catch (error) {
//     return Promise.reject(error); // Re-throw error for better handling upstream
//   }
// };

// const apiUpdatePost = async (data: PostContent): Promise<any> => {
//   try {
//     const response = await httpRequest.put(`/post/update-post`, data);
//     return response.data;
//   } catch (error) {
//     return Promise.reject(error); // Re-throw error for better handling upstream
//   }
// };

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
export { apiGetPost,getDetailPost,getRelatedPosts,apiCreatePost
  // , apiNewPost, apiCreatePost, apiapiGetPostAdmin, apiUpdatePost, apiDeletePost, apiDetailPost 
};
