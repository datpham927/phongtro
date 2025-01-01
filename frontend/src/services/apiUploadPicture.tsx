import axios from 'axios';
import { ENV } from '../utils/config/ENV';

export const apiUploadImage = async (data: any ) => {
    try {
        const res = await axios.post(
            `https://api.cloudinary.com/v1_1/${ENV.CLOUDINARY_CLOUD_NAME}/image/upload`,
            data,
        );
        return res.data;
    } catch (error) {
        return {
            success: false,
            message: error,
        };
    }
};
