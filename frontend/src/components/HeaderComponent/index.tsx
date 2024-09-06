import { useDispatch } from "react-redux";
import { useAppSelector } from "../../redux/hooks";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import { menuManage } from "../../utils/menuManage";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import UserComponent from "../UserComponent";
import { setFeatureAuth, setOpenFeatureAuth } from "../../redux/action/actionSlice";
import { setCategories } from "../../redux/category/categorySlice";
import { getAllCategory } from "../../services/apiCategory";
import { setDetailUser } from "../../redux/user/userSlice";
import { setIsLoginSuccess } from "../../redux/auth/authSlice";
import { apiLogout } from "../../services/apiAuth";

const HeaderComponent=()=> {
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  // const { openFeatureAuth, featureAuth  } = useAppSelector((state) => state.action);
  const {  isLogged  } = useAppSelector((state) => state.auth);
  const navigate=useNavigate()
  useEffect(() => {
    const fetchApi = async () => {
      const res = await getAllCategory();
      if (res?.status) {
        dispatch(setCategories(res?.data));
      }
    };
    fetchApi();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogout = async () => {
        const res = await apiLogout();
        if (!res.status) return;
        localStorage.clear();
        dispatch(setDetailUser({}));
        dispatch(setIsLoginSuccess(false));
        window.location.reload();
        navigate("/")
}


  // () => {
  //   han
  //   // toastMessage("Đăng xuất thành công");
  // }
  
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
                <div className="absolute flex flex-col top-[80%] bg-white w-[200px] p-3 rounded-sm shadow-custom z-10">
                  {menuManage.map((e) => (
                    <Link to={e.path} key={e.id}
                      className=" border-solid border-b-[1px] border-gray-300 py-2 text-sm text-blue-custom cursor-pointer hover:text-orange-500">
                      {e.text}
                    </Link>
                  ))}
                  <span
                    className=" border-solid py-2 text-sm text-blue-custom cursor-pointer  hover:text-orange-500"
                    onClick={handleLogout}
                  >
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
