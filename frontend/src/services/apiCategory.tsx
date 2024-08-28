import { httpRequest } from "../utils/httpRequest";

const getAllCategory = async () => {
  try {
    const response = await httpRequest.get("category/all");
    return response.data;
  } catch (error) {
    return error;
  }
};

export { getAllCategory };
