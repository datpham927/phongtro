export interface IUserDetail {
    id   ?: string ,
    name   :string,
    email   :string,
    phone   :string,
    zalo :string,
    facebook     :string,
    avatar       :string,
     type: string; 
}

export interface ICreateIUser extends IUserDetail{ 
    password  :string,
    confirm_password  :string,
}