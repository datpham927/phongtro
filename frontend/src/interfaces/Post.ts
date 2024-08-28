import { IUserDetail } from "./UserDetail";

export interface IPost {
      id: string;
      user: IUserDetail,
      title: string;
      thumb: string;
      description: string;
      slug: string;
      images:[]
      area: {
              order: string;
              value: string;
      };
      price: {
        order: string;
        value: string;
      };
      address: {
        city_name: string;
        district_name: string;
        ward_name: string;
        city_slug: string,
        district_slug:string,
        ward_slug:string,
      };
    }

export interface IDetailPost extends IPost {
    attribute: {
      target: string;
      type_post: string;
      expire: string;
    };
  }