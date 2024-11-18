import { editIcon, manageIcon } from "../assets";
import { PATH } from "./constant";

export const menuManageAdmin = [
  {
    id: 1,
    text: "Duyệt bài đăng",
    path: `${PATH.SYSTEM}/${PATH.APPROVE_POST}`,
    icon:manageIcon
  },
  {
    id: 2,
    text: "Quản lý người dùng",
    path: `${PATH.SYSTEM}/${PATH.MANAGE_USER}`,
    icon:editIcon
  }, 
  {
    id: 3,
    text: "Quản lý danh mục",
    path: `${PATH.SYSTEM}/${PATH.MANAGE_CATEGORY}`,
    icon:manageIcon
  },
  {
    id: 4,
    text: "Sửa thông tin cá nhân",
    path: `${PATH.SYSTEM}/${PATH.EDIT_ACCOUNT}`,
    icon:editIcon
  },
 
];
