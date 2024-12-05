import { useDispatch } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import ButtonComponent from "../ButtonComponent/ButtonComponent"; 
import { Link, useNavigate } from "react-router-dom";
import {   useState } from "react";
import UserComponent from "../UserComponent";
import { setFeatureAuth, setLoading, setOpenFeatureAuth } from "../../redux/action/actionSlice"; 
import { setDetailUser } from "../../redux/user/userSlice";
import { setIsLoginSuccess } from "../../redux/auth/authSlice";
import { apiLogout } from "../../services/apiAuth";
import { menuSidebar } from "../../utils/menuSidebar";
import { menuSidebarAdmin } from "../../utils/menuSidebarAdmin";

const HeaderComponent=()=> {
  const [modal, setModal] = useState(false);
  // const { openFeatureAuth, featureAuth  } = useAppSelector((state) => state.action);
  const {  isLogged  } = useAppSelector((state) => state.auth);
  const user = useAppSelector((state) => state.user);
  const dispatch= useAppDispatch();

  const navigate=useNavigate()

  const handleLogout = async () => {
         dispatch(setLoading(true))
        const res = await apiLogout();
        dispatch(setLoading(false))
        if (!res.status) return;
        localStorage.clear();
        dispatch(setDetailUser({}));
        dispatch(setIsLoginSuccess(false));
        window.location.reload();
        navigate("/")
} 
 
  return (
    <div>
      <div className="flex justify-between w-[1100px] mx-auto">
        <div>
          <img
            className="w-[240px] h-[70px] object-contain"
            src="https://phongtro123-hip06.vercel.app/static/media/logowithoutbg.bf008420f8d82e029a9b.png"
            alt=""
          />
        </div>
        {isLogged && <UserComponent />}
        <div className="flex items-center gap-2 relative">
          {isLogged ? (
            <>
              <ButtonComponent text="Quản lý tài khoản" onClick={() => setModal(!modal)}/>
              {modal && (
                <div className="absolute flex flex-col  top-[80%] bg-white w-[200px] p-3 rounded-sm shadow-custom z-[1000]">
                  {(user.type=='admin'? menuSidebarAdmin: menuSidebar).map((e) => (
                    <Link to={e.path} key={e.id}
                      className="flex items-center gap-2 border-solid border-b-[1px] border-gray-300 py-2 text-sm text-blue-custom cursor-pointer hover:text-orange-500">
                      <img className="w-[15px] h-[15px]" src={e.icon}></img>
                      {e.text}
                    </Link>
                  ))}
                  <span
                    className="flex items-center gap-2 border-solid py-2 text-sm text-blue-custom cursor-pointer  hover:text-orange-500"
                    onClick={handleLogout}
                  >
                       <img className="w-[15px] h-[15px]" src="https://phongtro123.com/images/dashboard-logout.svg"></img>
                    Thoát
                  </span>
                </div>
              )}
            </>
          ) : (
            <>
              <ButtonComponent text="Đăng Nhập" onClick={() => {
                dispatch(setOpenFeatureAuth(true));
                dispatch(setFeatureAuth(1))
              }} />
              <ButtonComponent text="Đăng ký" onClick={() => {
                dispatch(setOpenFeatureAuth(true));
                dispatch(setFeatureAuth(0))
              }}  />
            </>
          )}
          <ButtonComponent
            text="Đăng tin mới"
            className={"bg-red-custom text-white "}
          />
        </div>
      </div>
    </div>
  );
}

export default HeaderComponent;
