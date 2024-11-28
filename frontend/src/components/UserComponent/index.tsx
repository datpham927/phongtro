import { memo } from "react";
import { useAppSelector } from "../../redux/hooks";
import { IUserDetail } from "../../interfaces/User";
import { formatNumber } from "../../utils/format/formatNumber";

function UserComponent() {
  const  user:IUserDetail   = useAppSelector((state) => state.user);
  return (
    <div className="flex items-center">
      <img
        className="w-[40px] h-[40px] rounded-full"
        src={`${user?.avatar
          ? user?.avatar
          : "https://phongtro123.com/images/default-user.png"
          }`}
        alt=""
      />

      <div className="flex flex-col ml-3">
        <span className="text-base">
          Xin Chào, <strong>{user?.name}</strong>
        </span>
        <span className="text-[12px] ">
          Mã tài khoản:
          <strong>
            {user?.id?.match(/\d+(\.\d+)?/g)?.join("") .slice(0, 5)}
          </strong>
        </span>
        <span className="text-[12px] ">
          Số dư tài khoản:
          <strong> {formatNumber(user?.account_balance)} </strong>
        </span>
      </div>
    </div>
  );
}

export default memo(UserComponent);
