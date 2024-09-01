import { httpRequest } from "../utils/httpRequest";

 

// interface PostContent {
//   // Define the structure of the post content object
//   // Example:
//   title: string;
//   description: string;
//   [key: string]: any;
// }

const getAllPost = async ( query: any): Promise<any> => {
  try {
    const response = await httpRequest.get(`/post/all`, { params:query});
    return response.data;
  } catch (error) {
    return Promise.reject(error); // Re-throw error for better handling upstream
  }
};

// const apiNewPost = async (query: QueryParams = {}): Promise<any> => {
//   try {
//     const response = await httpRequest.get(`/post/new-post`, {
//       params: query,
//     });
//     return response.data;
//   } catch (error) {
//     return Promise.reject(error); // Re-throw error for better handling upstream
//   }
// };

// const apiCreatePost = async (content: PostContent): Promise<any> => {
//   try {
//     const response = await httpRequest.post(`/post/create-post`, content);
//     return response.data;
//   } catch (error) {
//     return Promise.reject(error); // Re-throw error for better handling upstream
//   }
// };

// const apiGetPostAdmin = async (): Promise<any> => {
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

export { getAllPost,getDetailPost
  // , apiNewPost, apiCreatePost, apiGetPostAdmin, apiUpdatePost, apiDeletePost, apiDetailPost 
};
