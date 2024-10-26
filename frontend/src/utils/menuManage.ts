import { editIcon , manageIcon } from "../assets";
import { PATH } from "./constant";

export const menuManage = [
  {
    id: 1,
    text: "Quản lý tin đăng",
    path: `${PATH.SYSTEM}/${PATH.MANAGE_POST}`,
    icon:manageIcon
  },
  {
    id: 2,
    text: "Sửa thông tin cá nhân",
    path: `${PATH.SYSTEM}/${PATH.EDIT_ACCOUNT}`,
    icon:editIcon
  },
 
];
