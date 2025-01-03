import { IUserDetail } from "./User";

export interface IPost {
      id: string;
      priority:number,
      user: IUserDetail,
      title: string;
      thumb: string;
      description: string;
      slug: string;
      is_approved?:boolean;
      images:[]
      area:{
        number:string,
        value:string
      }
      price:{
        number:string,
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
      };
      address_detail:string
      map:string
      created_at:string,
      expire_at:string
    }

export interface IDetailPost extends IPost {
    target: string;
      post_type: {
            name:string,
            priority:number
       },
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
    priceNumber: string;
    province: string;
    target: string;
    title: string;
    district:string,
    ward:string,
    address_detail:string
  }
  