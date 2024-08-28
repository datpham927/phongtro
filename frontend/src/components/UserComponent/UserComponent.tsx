import { memo } from "react";
import { useAppSelector } from "../../redux/hooks";

function UserComponent() {
  const  user   = useAppSelector((state) => state.user);
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
      </div>
    </div>
  );
}

export default memo(UserComponent);
