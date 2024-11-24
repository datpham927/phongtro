export interface IUserDetail {
    id   ?: string ,
    name   :string,
    email   :string,
    phone   :string,
    zalo :string,
    facebook     :string,
    avatar       :string,
    account_balance:Number,
     type: string; 
    post_quantity?:any

}

export interface ICreateIUser extends IUserDetail{ 
    password  :string,
    confirm_password  :string,
}