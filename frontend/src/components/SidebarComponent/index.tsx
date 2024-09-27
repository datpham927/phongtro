import { NavLink, useNavigate } from "react-router-dom";
import { menuManage } from "../../utils/menuManage";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import { PATH } from "../../utils/constant";
import { apiLogout } from "../../services/apiAuth";
import { setDetailUser } from "../../redux/user/userSlice";
import { setIsLoginSuccess } from "../../redux/auth/authSlice";
import { exitIcon } from "../../assets";
import { setLoading } from "../../redux/action/actionSlice";
import { menuManageAdmin } from "../../utils/menuManageAdmin";
function SidebarComponent() {
  const  user  = useAppSelector((state) => state.user);
  const dispatch=useAppDispatch()
  const navigate=useNavigate()
  const handleLogout = async () => {
    dispatch(setLoading(true))
    const res = await apiLogout();
    if (!res.status) return;
    localStorage.clear();
    dispatch(setDetailUser({}));
    dispatch(setIsLoginSuccess(false));
    dispatch(setLoading(false))
    window.location.reload();
    navigate("/")
} 
  return (
    <div className="flex flex-col p-3 border-r border-gray-300  py-2 px-4">
      <div className="w-full">
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
       <div className="flex gap-3 my-2">
       <ButtonComponent text="Nạp tiền" className="!text-[12px] bg-[#ffc107] !py-0 !px-2 "
       onClick={()=>navigate("/nop-tien")}
       />
       <ButtonComponent text="Đăng tin" className="!text-[12px] bg-red-600 !py-0 !px-2 text-white" 
          onClick={()=>navigate(`${PATH.SYSTEM}/${PATH.CREATE_POST}`)}
       />
       </div>
      </div>
      <ul className="flex flex-col mt-5">
        {(user.type=='admin'?menuManageAdmin:menuManage).map((e) => (
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
           <li
                    className="flex items-center gap-2 border-solid py-2 text-sm cursor-pointer  hover:text-orange-500"
                    onClick={handleLogout}
                  >
                      {exitIcon}
                    Thoát
                  </li>
      </ul>
    </div>
  );
}

export default SidebarComponent;
