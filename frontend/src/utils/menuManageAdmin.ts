import { editIcon, manageIcon } from "../assets";
import { PATH } from "./constant";

export const menuManageAdmin = [
  {
    id: 1,
    text: "Thống kê",
    path: `${PATH.SYSTEM}/${PATH.MANAGE_STATISTICAL}`,
    icon:manageIcon
  },
  {
    id: 2,
    text: "Duyệt bài đăng",
    path: `${PATH.SYSTEM}/${PATH.APPROVE_POST}`,
    icon:manageIcon
  },
  {
    id: 3,
    text: "Quản lý người dùng",
    path: `${PATH.SYSTEM}/${PATH.MANAGE_USER}`,
    icon:editIcon
  }, 
  {
    id: 4,
    text: "Quản lý danh mục",
    path: `${PATH.SYSTEM}/${PATH.MANAGE_CATEGORY}`,
    icon:manageIcon
  }, 
  {
    id: 5,
    text: "Quản lý giá bản tin",
    path: `${PATH.SYSTEM}/${PATH.MANAGE_POST_TYPE_LIST}`,
    icon:manageIcon
  },
  {
    id:6,
    text: "Sửa thông tin cá nhân",
    path: `${PATH.SYSTEM}/${PATH.EDIT_ACCOUNT}`,
    icon:editIcon
  },
 
];
