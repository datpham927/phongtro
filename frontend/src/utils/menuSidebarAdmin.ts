import { PATH } from "./constant";

export const menuSidebarAdmin = [
  {
    id: 1,
    text: "Quản lý người dùng",
    path: `${PATH.SYSTEM}/${PATH.MANAGE_USER}`,
    icon:"https://phongtro123.com/images/dashboard-manage-post.svg"
  },
  {
    id: 4,
    text: "Thông tin cá nhân",
    path: `${PATH.SYSTEM}/${PATH.EDIT_ACCOUNT}`,
    icon:"https://phongtro123.com/images/dashboard-user.svg"
  } 
];
