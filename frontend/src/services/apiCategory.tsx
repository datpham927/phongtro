import { axiosJWT, httpRequest } from "../utils/httpRequest";

const apiGetAllCategory = async (query:any) => {
  try {
    const response = await httpRequest.get("category/all",{params:query});
    return response.data;
  } catch (error) {
    return error;
  }
};
const apiCreateCategory = async (data:any) => {
  try {
    const response = await axiosJWT.post("category/add",data);
    return response.data;
  } catch (error) {
    return error;
  }
};
const apiUpdateCategory = async (data:any,cid:any) => {
  try {
    const response = await axiosJWT.put(`category/${cid}/update`,data);
    return response.data;
  } catch (error) {
    return error;
  }
};

const apiDeleteCategory = async (cid:string) => {
  try {
    const response = await axiosJWT.delete(`category/${cid}/destroy` );
    return response.data;
  } catch (error) {
    return error;
  }
};
const apiGetCategory = async (cid:string) => {
  try {
    const response = await axiosJWT.get(`category/${cid}/get` );
    return response.data;
  } catch (error) {
    return error;
  }
};
export { apiGetAllCategory,apiCreateCategory,apiUpdateCategory,apiDeleteCategory,apiGetCategory };
