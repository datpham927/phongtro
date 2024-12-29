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
const apiGetExpiredPostForShop = async ( query: any): Promise<any> => {
  try {
    const response = await axiosJWT.get(`/post/expired`, { params:query});
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
const apiUpdatePost = async (pid:string,data: any): Promise<any> => {
  try {
    const response = await axiosJWT.put(`/post/${pid}/update`, data);
    return response.data;
  } catch (error) {
    return Promise.reject(error); // Re-throw error for better handling upstream
  }
};

const apiDeletePost = async (postId: string): Promise<any> => {
  try {
    const response = await axiosJWT.delete(`/post/${postId}/delete` ) 
    return response.data;
  } catch (error) {
    return Promise.reject(error); // Re-throw error for better handling upstream
  }
};

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
const getNewPosts = async ( )  => {
  try {
    const response = await httpRequest.get(`/post/new-post`);
    return response.data;
  } catch (error) {
    return Promise.reject(error); // Re-throw error for better handling upstream
  }
};
const getLocationPosts = async (city_slug:string ,district_slug:string )  => {
  try {
    const response = await httpRequest.get(`/post/location-post/${city_slug}/${district_slug}`);
    return response.data;
  } catch (error) {
    return Promise.reject(error); // Re-throw error for better handling upstream
  }
};

const getAllUnapprovedPosts = async ( query: any): Promise<any> => {
  try {
    const response = await  axiosJWT.get(`post/unapproved`,{params:query});
    return response.data;
  } catch (error) {
    return Promise.reject(error); // Re-throw error for better handling upstream
  }
};
const apiApprovedPost= async (postId:string): Promise<any> => {
  try {
    const response = await  axiosJWT.post(`post/${postId}/is-approved`);
    return response.data;
  } catch (error) {
    return Promise.reject(error); // Re-throw error for better handling upstream
  }
};
export { apiGetPost,getDetailPost,getRelatedPosts,apiCreatePost,apiGetPostForShop,
  apiUpdatePost,apiDeletePost,getNewPosts,getLocationPosts,apiGetExpiredPostForShop,getAllUnapprovedPosts,apiApprovedPost
  // , apiNewPost, apiCreatePost, apiapiGetPostAdmin, apiUpdatePost, apiDeletePost, apiDetailPost 
};
