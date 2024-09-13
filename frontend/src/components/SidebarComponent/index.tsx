import { NavLink } from "react-router-dom";
import { menuManage } from "../../utils/menuManage";
import { useAppSelector } from "../../redux/hooks";
function SidebarComponent() {
  const  user  = useAppSelector((state) => state.user);
  return (
    <div className="flex flex-col p-3 border-r border-gray-300  py-2 px-4">
      <div className="flex items-center">
        <img
          className="w-[50px] h-[50px] rounded-full"
          src={`${user?.avatar
            ? user?.avatar
            : "https://phongtro123.com/images/default-user.png"
            }`}
          alt=""
        />

        <div className="flex flex-col ml-3">
          <span className="text-base">
            <strong>{user?.name}</strong>
          </span>
          <span className="text-[12px]">{user?.phone}</span>
        </div>
      </div>
      <span className="my-2 text-sm">
        Mã thành viên :
        <strong>
          {user?.id
            ?.match(/\d+(\.\d+)?/g)
            ?.join("")
            ?.slice(0, 5)}
        </strong>
      </span>

      <ul className="flex flex-col mt-5">
        {menuManage.map((e) => (
          <li className=" flex text-center gap-2 text-sm  hover:bg-[#f1f1f1] py-3">
             {e.icon}
            <NavLink
              key={e.id}
              to={e.path}
              className={({ isActive }) => (isActive ? "text-red-400" : "")}
            >
              {e.text}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SidebarComponent;
