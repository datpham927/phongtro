import axios from 'axios';
import { httpRequest } from '../utils/httpRequest';

const getApiPublicProvince = async () => {
    try {
        const response = await axios.get('https://provinces.open-api.vn/api/p');
        return response.data;
    } catch (error) {
        return error;
    }
};

const getApiPublicDistrict = async (province_code: any) => {
    try {
        const response = await axios.get(`https://provinces.open-api.vn/api/p/${province_code}?depth=2`);
        return response.data;
    } catch (error) {
        return error;
    }
};
const getApiPublicWards= async (districtId: any) => {
    try {
        const response = await axios.get(`https://provinces.open-api.vn/api/d/${districtId}?depth=2`);
        return response.data;
    } catch (error) {
        return error;
    }
};

const getDistrictByCity= async (city_slug: any) => {
    try {
        const response = await httpRequest.get(`address/${city_slug}/all_district_by_city`);
        return response.data;
    } catch (error) {
        return error;
    }
};
const getWardByCityAndDistrict= async (city_slug: any,ward_slug:any) => {
    try {
        const response = await httpRequest.get(`address/${city_slug}/${ward_slug}/all_ward_by_district`);
        return response.data;
    } catch (error) {
        return error;
    }
};


const getDistrictBelongCategoryByCity= async (category_slug:any,city_slug: any) => {
    try {
        const response = await httpRequest.get(`address/${category_slug}/${city_slug}/all_district_by_city`);
        return response.data;
    } catch (error) {
        return error;
    }
};
const getWardBelongCategoryByCityAndDistrict= async (category_slug:any,city_slug: any,ward_slug:any) => {
    try {
        const response = await httpRequest.get(`address/${category_slug}/${city_slug}/${ward_slug}/all_ward_by_district`);
        return response.data;
    } catch (error) {
        return error;
    }
};


const getAddress= async ( ward_slug:any) => {
    try {
        const response = await httpRequest.get(`address/${ward_slug}/get-address`);
        return response.data;
    } catch (error) {
        return error;
    }
};


const getApiProvince = async () => {
    try {
        const response = await httpRequest.get('/address/get-city');
        return response.data;
    } catch (error) {
        return error;
    }
};

const getApiCurrentLocation = async (latitude:number,longitude:number) => {
    try {
        const response = await axios.get(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);
        return response.data;
    } catch (error) {
        return error;
    }
};
const getApiCodeLocation = async (placeName:string) => {
    try {
        const response = await axios.get( `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(placeName)}&addressdetails=1&language=vi`);
        return response.data;
    } catch (error) {
        return error;
    }
};

// const getApiDistrict = async (province_code: any) => {
//     try {
//         const response = await axios.get(`https://provinces.open-api.vn/api/p/${province_code}?depth=2`);
//         return response.data;
//     } catch (error) {
//         return error;
//     }
// };
// const getApiWards= async (districtId: any) => {
//     try {
//         const response = await axios.get(`https://provinces.open-api.vn/api/${districtId}?depth=2`);
//         return response.data;
//     } catch (error) {
//         return error;
//     }
// };

export { getApiPublicProvince, getAddress, getWardBelongCategoryByCityAndDistrict,getDistrictBelongCategoryByCity,
     getApiPublicDistrict, getApiCodeLocation, getApiCurrentLocation, getApiPublicWards,getDistrictByCity,getWardByCityAndDistrict,getApiProvince};
