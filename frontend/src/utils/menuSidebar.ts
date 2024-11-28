import { PATH } from "./constant";

export const menuSidebar = [
  {
    id: 1,
    text: "Đăng tin cho thuê",
    path: `${PATH.SYSTEM}/${PATH.CREATE_POST}`,
    icon:"https://phongtro123.com/images/dashboard-add-post.svg"
  },
  {
    id: 2,
    text: "Quản lý tin đăng",
    path: `${PATH.SYSTEM}/${PATH.MANAGE_POST}`,
    icon:"https://phongtro123.com/images/dashboard-manage-post.svg"
  },
  {
    id: 4,
    text: "Thông tin cá nhân",
    path: `${PATH.SYSTEM}/${PATH.EDIT_ACCOUNT}`,
    icon:"https://phongtro123.com/images/dashboard-user.svg"
  }  
];
