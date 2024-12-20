import { historyIcon, editIcon  , manageIcon, cardIcon, priceIcon, depositIcon } from "../assets";
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
  }, {
    id: 4,
    text: "Lịch sử nạp tiền",
    path:PATH.DEPOSIT_HISTORY,icon:cardIcon
  },
  {
    id: 4,
    text: "Lịch sử thanh toán",
    path:PATH.PAYMENT_HISTORY,icon:historyIcon
  },  {
    id: 5,
    text: "Bản giá dịch vụ",
    path: PATH.POST_TYPE_LIST,
    icon:priceIcon
  },
  {
    id:6,
    text: "Nạp tiền",
    path: PATH.DEPOSIT,
    icon:depositIcon
  }
];
