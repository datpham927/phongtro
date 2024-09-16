import { IUserDetail } from "./UserDetail";

export interface IPost {
      id: string;
      user: IUserDetail,
      title: string;
      thumb: string;
      description: string;
      slug: string;
      images:[]
      area:{
        order:string,
        value:string
      }
      price:{
        order:string,
        value:string
      }
      address: {
        id:string;
        city_name: string;
        district_name: string;
        ward_name: string;
        city_slug: string,
        district_slug:string,
        ward_slug:string,
        address_detail:string
        map:string
      };
      created_at:string,
      expire_at:string
    }

export interface IDetailPost extends IPost {
    attribute: {
      target: string;
      type_post: string;
      expire: string;
    }; 
    category:{
      id:string,
      name:string,
      slug:string
    } 
  }


 export  interface IPostPayload {
    areaNumber: string;
    categoryCode: string;
    description: string;
    images: string[];
    map: string;
    priceNumber: string;
    province: string;
    target: string;
    title: string;
    district:string,
    ward:string,
    address_detail:string
  }
  